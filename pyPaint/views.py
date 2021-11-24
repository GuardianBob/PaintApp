from django.shortcuts import render, HttpResponse, HttpResponseRedirect, redirect
from django.http import JsonResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import *
from .models import Profile, CanvasImg
from binascii import a2b_base64
from base64 import b64decode
import urllib, io, PIL, os


def index(request):
    return render(request, 'index.html')

def canvas(request, img_id=None):
    imgFile=None        
    if validate_user(request) is True:
        if not img_id is None:
            imgFile = CanvasImg.objects.get(id=img_id)
            # print(imgFile.name)
    user_id = get_user_id(request)    
    if request.method == 'POST':
        form = CanvasForm(request.POST, request.FILES)
        if form.is_valid():
            # print("worked!")
            imgFile = CanvasImg.objects.filter(userID=user_id).latest('created_at')
            return redirect(f'/canvas/{imgFile.id}')
        # else:
        #     print(form.is_valid())
    else:        
        form = CanvasForm()    
    context = {
        'form' : form, 
        'user_id': user_id,
        'user': request.user,
        'imgFile': imgFile,
    }
    return render(request, 'canvas.html', context)

# NOTE: This is the original logged-in validation I used:
def get_user_id(request):
    if not 'user_id' in request.session:
        return None   
    else:
        user_id = request.session['user_id']
        return user_id

# Authentication keeps returning AnonymousUser when user is signed in
# This updates it to fix the problem
def validate_user(request):
    if request.user.is_authenticated is False:  # Initially this always returns false. 
    # request.user needs to be set here initially for some reason.  Once it is set, request.user 
    # will always be the logged in user and this will return True.
        user_id = get_user_id(request)
        # print(user_id)
        if not user_id is None:
            request.user = User.objects.get(id=user_id) # set request.user to logged in user
            return True
        else:
            return False
    else:
        return True

def profile(request, user_id):
    if validate_user(request) is False:
        return redirect('/login')
    profile = User.objects.get(id=user_id)  
    artwork = CanvasImg.objects.filter(userID=profile.id).order_by('-created_at')
    # print(request.user)
    context = {
        'user': request.user,
        'profile': profile,
        'artwork': artwork,
        'user_id': user_id,
    }
    return render(request, "profile.html", context)

def imgUpload(request):
    if validate_user(request) is False:
        return redirect('/login')
    if request.method == 'POST':
        # print(request.POST['image'])
        # file = a2b_base64(request.POST['image'] + "=")
        # image_bytes = io.BytesIO(request.POST['image'])
        # img = PIL.Image.open(image_bytes)
        data_uri = request.POST['image']        
        with urllib.request.urlopen(data_uri) as response:
            file = response.read()    
        
        f = open("image.png", "wb")
        f.write(file)
            
        form = CanvasForm({'name': request.POST['name'], 'image': f}, f)
        
        if form.is_valid():
            form.save()
            print("Success!!! :D")
            return HttpResponse('SUCCESS!! :D')
        
    print("Failed!!! :(")
    return HttpResponse('FAILED!! :(')

def upload(request):
    if validate_user(request) is False:
        return redirect('/login')
    if request.method == 'POST':
        form = CanvasForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        user_id = get_user_id(request)
        form = CanvasForm()
    return render(request, 'upload.html', {'form' : form, 'user_id': user_id})

def success(request):
    return HttpResponse('successfully uploaded')

def user_collection(request, profile_id): 
    if validate_user(request) is False:
        return redirect('/login')
    profile = User.objects.get(id=profile_id)
    context = {
        'profile': profile,
    }
    return render(request, "user_art.html", context)

def edit_profile(request):
    # To be added
    pass

def update_profile(request):
    # To be added
    pass
    
def recent_activity(request): 
    validate_user(request)
    # user_id = get_user_id(request)       
    context = {
        'user': request.user,
        'user_id': request.user.id,
        'artwork': CanvasImg.objects.order_by('-created_at'),
    }
    return render(request, 'activity.html', context)

def edit_image(request, img_id):
    if validate_user(request) is False:
        return redirect('/login')
    imgFile = CanvasImg.objects.get(id=img_id)
    context = {
        'imgFile' : imgFile,
        'user': request.user,
        'user_id': request.user.id,
    }    
    pass 

def remove_image(request, img_id):
    if validate_user(request) is False:
        return redirect('/login')
    image = CanvasImg.objects.get(id=img_id)
    image.image.delete() if image.image else None
    image.delete()
    
    response = 'success'
    # print(books)
    return HttpResponse("Delete Successful!")