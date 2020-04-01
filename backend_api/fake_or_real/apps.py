from django.apps import AppConfig


class FakeOrRealConfig(AppConfig):
    name = 'fake_or_real'

    def ready(self):
        import fake_or_real.signals
