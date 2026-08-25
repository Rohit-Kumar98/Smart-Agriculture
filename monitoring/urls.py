from django.urls import path

from .views import RoverDataView


urlpatterns = [
    path(
        "rover-data/",
        RoverDataView.as_view()
    ),
]