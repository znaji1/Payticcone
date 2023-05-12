from rest_framework import viewsets
from .models import UploadedFile
from .serializers import UploadedFileSerializer
import pandas as pd


class UploadedFileViewSet(viewsets.ModelViewSet):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer

    def perform_create(self, serializer):
        file = serializer.validated_data["file"]
        # Perform your data transformations using Pandas and SQL Alchemy here
        # Example transformation: Read CSV file using Pandas
        data = pd.read_csv(file)

        # Save the transformed data to the database
        # Example: Save the transformed data to another model
        # transformed_data = MyTransformedData(data=data)
        # transformed_data.save()

        serializer.save()
