# Generated by Django 3.2.8 on 2021-11-22 01:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pyPaint', '0004_canvasimg_collection'),
    ]

    operations = [
        migrations.AddField(
            model_name='canvasimg',
            name='uploaded_by',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='art_uploaded', to='auth.user'),
            preserve_default=False,
        ),
    ]
