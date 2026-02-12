from django.db import models

class Employee(models.Model):
    employee_id = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee_id} - {self.full_name}"

class Attendance(models.Model):
    STATUS_CHOICES = [('P','Present'), ('A','Absent')]
    employee = models.ForeignKey(Employee, related_name='attendance', on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('employee','date')
        ordering = ['-date']

    def __str__(self):
        return f"{self.employee.employee_id} {self.date} {self.status}"
