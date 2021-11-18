from rest_framework import serializers
from .models import Todo

# This is where you would add models to be converted by the serializers into JSON
# Create class here to extend class from models.py
# https://www.section.io/engineering-education/react-and-django-rest-framework/

# NOTE REMOVE Todo models, etc.

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id' ,'title', 'description', 'completed')