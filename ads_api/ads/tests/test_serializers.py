from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase, APIRequestFactory
from ads.models import Ad, Photo
from ads.serializers import PhotoSerializer, AdSerializer, AdCreateSerializer
from django.urls import reverse


class SerializerTests(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.ad = Ad.objects.create(
            title="Test Ad",
            descr="Test description",
            body="Full body of the ad",
            price=100.0
        )
        self.create_url = reverse('ad_create')
        self.update_url = reverse('ad_update', args=[self.ad.id])
        self.photo = Photo.objects.create(
            ad=self.ad,
            image=SimpleUploadedFile("test.jpg", b"file_content", content_type="image/jpeg")
        )

    def test_photo_serializer_output(self):
        serializer = PhotoSerializer(instance=self.photo)
        self.assertEqual(set(serializer.data.keys()), {"ad", "image"})
        self.assertEqual(serializer.data["ad"], self.ad.id)

    def test_ad_serializer_output(self):
        serializer = AdSerializer(instance=self.ad)
        self.assertIn("created_at", serializer.data)
        self.assertIn("updated_at", serializer.data)
        self.assertIn("photos", serializer.data)
        self.assertEqual(serializer.data["photos"][0]["image"], self.photo.image.url)

    def test_ad_create_serializer_with_valid_data(self):
        request = self.factory.post(self.create_url, {
            "title": "New Ad",
            "descr": "Short description",
            "body": "Detailed body",
            "price": 200.0,
        }, format="multipart")

        image = SimpleUploadedFile("new.jpg", b"new_image_content", content_type="image/jpeg")
        request.FILES.setlist("photos", [image])

        serializer = AdCreateSerializer(
            data={
                "title": "New Ad",
                "descr": "Short description",
                "body": "Detailed body",
                "price": 200.0,
            },
            context={"request": request}
        )
        self.assertTrue(serializer.is_valid(), serializer.errors)
        ad = serializer.save()

        self.assertEqual(ad.title, "New Ad")
        self.assertEqual(ad.photos.count(), 1)
        self.assertRegex(ad.photos.first().image.name.split("/")[-1], r"new.*\.jpg")

    def test_ad_create_serializer_update_photos(self):
        image = SimpleUploadedFile("updated.jpg", b"new_image", content_type="image/jpeg")
        request = self.factory.put(self.update_url, {
            "title": "Updated Ad",
            "descr": "Updated desc",
            "body": "Updated body",
            "price": 150.0,
        }, format="multipart")
        request.FILES.setlist("photos", [image])

        serializer = AdCreateSerializer(
            instance=self.ad,
            data={
                "title": "Updated Ad",
                "descr": "Updated desc",
                "body": "Updated body",
                "price": 150.0,
            },
            context={"request": request}
        )

        self.assertTrue(serializer.is_valid(), serializer.errors)
        ad = serializer.save()

        self.assertEqual(ad.title, "Updated Ad")
        self.assertEqual(ad.photos.count(), 1)
        self.assertRegex(ad.photos.first().image.name.split("/")[-1], r"updated.*\.jpg")
