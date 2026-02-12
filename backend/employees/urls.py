from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet, SummaryView
from django.urls import path, include

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'attendances', AttendanceViewSet, basename='attendance')

urlpatterns = [
    path('', include(router.urls)),
    path('summary/', SummaryView.as_view(), name='summary'),
]
