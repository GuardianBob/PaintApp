from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # Delete profile when user is deleted
    # image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile' # show how we want it to be displayed

    # Override the save method of the model
    def save(self):
        super().save()

        # img = Image.open(self.image.path) # Open image
        
        # # resize image
        # if img.height > 300 or img.width > 300:
        #     output_size = (300, 300)
        #     img.thumbnail(output_size) # Resize image
        #     img.save(self.image.path) # Save it again and override the larger image
        
class CanvasImg(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/')
    userID = models.IntegerField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)