from django.apps import AppConfig


class FakeOrRealConfig(AppConfig):
    name = 'fake_or_real'
    default_auto_field = "django.db.models.BigAutoField"

    def ready(self):

        import fake_or_real.signals
