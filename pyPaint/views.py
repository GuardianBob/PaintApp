from django.shortcuts import render, HttpResponse, HttpResponseRedirect, redirect
from django.http import JsonResponse, HttpResponseRedirect
from django.core import serializers

def index(request):
    return render(request, 'index.html')

def canvas(request):
    return render(request, 'canvas.html')