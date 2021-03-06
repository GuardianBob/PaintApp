from django.urls import path
from . import views, login
from django.contrib.auth import views as auth
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='home'),
    path('canvas', views.canvas, name='canvas'),
    # =================== Login URLs ===========================
    path('login/', login.login, name ='login'),
    path('logout/', login.logout_view, name ='logout'),
    path('register/', login.register, name ='register'),
    path('user_validate', login.validate_login, name='validate_login'),
    path('validate_register/', login.validate_register, name ='validate_register'),
    # =================== Profile URLs ==========================
    path('profile/<int:user_id>', views.profile, name='profile'),
    path('imgUpload', views.imgUpload, name='imgUpload'),
    path('upload', views.upload, name='upload'),
    path('success', views.success, name = 'success'),
    path('activity', views.recent_activity, name="recent_activity"),
    path('edit_profile', views.edit_profile, name="edit_profile"),
    path('update_profile', views.update_profile, name="update_profile"),
    path('canvas/<int:img_id>', views.canvas, name='edit_image'),
    path('remove/<int:img_id>', views.remove_image, name="remove_image"), # called when a user clicks to remove their review
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

