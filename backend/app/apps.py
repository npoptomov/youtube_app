# app/apps.py
from django.apps import AppConfig

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'

    def ready(self):
        from django_q.tasks import schedule
        schedule('app.tasks.fetch_data', schedule_type='I', minutes=1, repeats=-1)

