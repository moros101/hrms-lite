from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from django.db.models import Count, Q
from django.utils import timezone

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by('-created_at')
    serializer_class = EmployeeSerializer

    # /api/employees/<id>/attendance/
    @action(detail=True, methods=['get'])
    def attendance(self, request, pk=None):
        employee = self.get_object()
        date = request.query_params.get('date')  # optional filter
        qs = employee.attendance.all()
        if date:
            qs = qs.filter(date=date)
        serializer = AttendanceSerializer(qs, many=True)
        return Response(serializer.data)

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def create(self, request, *args, **kwargs):
        # Let serializer handle validation including unique constraint
        return super().create(request, *args, **kwargs)

# Dashboard / summary endpoint (optional)
from rest_framework.views import APIView

class SummaryView(APIView):
    def get(self, request):
        total_employees = Employee.objects.count()
        today = timezone.now().date()
        present_today = Attendance.objects.filter(date=today, status='P').count()
        # total present days per employee
        top = Employee.objects.annotate(present_days=Count('attendance', filter=Q(attendance__status='P'))).values('employee_id','full_name','present_days')
        return Response({
            "total_employees": total_employees,
            "present_today": present_today,
            "present_days_per_employee": list(top)
        })
