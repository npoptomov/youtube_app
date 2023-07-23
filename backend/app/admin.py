from django.contrib import admin
from .models import Channel, Video, Comment
from simple_history.admin import SimpleHistoryAdmin

admin.site.register(Channel, SimpleHistoryAdmin)
admin.site.register(Video, SimpleHistoryAdmin)
admin.site.register(Comment)


