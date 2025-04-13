from django.contrib import admin
from .models import Ad, Photo


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1
    fields = ['image']


@admin.register(Ad)
class AdAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'created_at', 'updated_at', 'photo_count']
    inlines = [PhotoInline]

    def photo_count(self, obj):
        return obj.photos.count()

    photo_count.short_description = 'Number of Photos'


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['id', 'ad', 'created_at']
    readonly_fields = []
