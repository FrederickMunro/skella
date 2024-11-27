package com.skella.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import java.time.Duration;


import java.nio.file.Path;

@Service
public class R2UploadService {

    private final S3Client s3Client;

    public R2UploadService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void uploadFile(String bucketName, String key, Path filePath) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromFile(filePath));
    }

    public void deleteFile(String bucketName, String key) {
        s3Client.deleteObject(builder -> builder.bucket(bucketName).key(key).build());
    }

    public String generateSignedUrl(String bucketName, String key) {
        try (S3Presigner presigner = S3Presigner.create()) {
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
    
            GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(30)) // URL valid for 30 minutes
                    .getObjectRequest(getObjectRequest)
                    .build();
    
            return presigner.presignGetObject(presignRequest).url().toString();
        }
    }
}
