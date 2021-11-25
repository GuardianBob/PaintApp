# Generated by Django 3.2.8 on 2021-11-23 18:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pyPaint', '0006_remove_canvasimg_uploaded_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='canvasimg',
            name='created_by',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='created', to='auth.user'),
            preserve_default=False,
        ),
    ]
