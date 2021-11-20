from django.shortcuts import render, HttpResponse, HttpResponseRedirect, redirect
from django.http import JsonResponse, HttpResponseRedirect
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib import messages

def index(request):
    return render(request, 'index.html')

def canvas(request):
    return render(request, 'canvas.html')

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
    context = {
        'user': request.user,
        'profile': profile,
    }
    return render(request, "profile.html", context)