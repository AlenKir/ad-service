from django.test import TestCase
from ads.models import Ad, Photo
from django.core.files.uploadedfile import SimpleUploadedFile
from decimal import Decimal
from time import sleep


class AdModelTest(TestCase):
    def setUp(self):
        self.ad = Ad.objects.create(
            title="Test Ad",
            descr="A test description",
            body="Full body of the ad",
            price=Decimal("199.99")
        )

    def test_str_fields(self):
        self.assertEqual(self.ad.title, "Test Ad")
        self.assertEqual(self.ad.descr, "A test description")
        self.assertEqual(self.ad.body, "Full body of the ad")
        self.assertEqual(self.ad.price, Decimal("199.99"))

    def test_auto_timestamps(self):
        self.assertIsNotNone(self.ad.created_at)
        self.assertIsNotNone(self.ad.updated_at)
        self.assertEqual(self.ad.created_at.date(), self.ad.updated_at.date())

    def test_ordering(self):
        sleep(0.01)

        ad2 = Ad.objects.create(
            title="Second Ad",
            descr="Another one",
            price=Decimal("50.00")
        )
        ads = Ad.objects.all()
        self.assertGreater(ad2.updated_at, self.ad.updated_at)
        self.assertEqual(ads[0], ad2)


class PhotoModelTest(TestCase):
    def setUp(self):
        self.ad = Ad.objects.create(
            title="Photo Test Ad",
            descr="Ad with photo",
            price=Decimal("10.00")
        )
        self.fake_image = SimpleUploadedFile(
            "test_image.jpg",
            content=b"fake-image-content",
            content_type="image/jpeg"
        )
        self.photo = Photo.objects.create(ad=self.ad, image=self.fake_image)

    def test_photo_attachment(self):
        self.assertEqual(self.photo.ad, self.ad)
        self.assertRegex(self.photo.image.name, r".*test_image.*\.jpg$")

    def test_photo_created_at(self):
        self.assertIsNotNone(self.photo.created_at)
