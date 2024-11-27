package com.skella.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import java.net.URI;

@Configuration
public class S3Config {

    @Value("${r2.access-key}")
    private String accessKey;

    @Value("${r2.secret-key}")
    private String secretKey;

    @Value("${r2.endpoint}")
    private String endpoint;

    @Value("${r2.bucket-name}")
    private String bucketName;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(
                    AwsBasicCredentials.create(accessKey, secretKey)
                ))
                .region(Region.of("auto")) // Use "auto" for R2; not used for actual regions
                .serviceConfiguration(S3Configuration.builder()
                        .pathStyleAccessEnabled(true) // Required for R2
                        .build())
                .endpointOverride(URI.create(endpoint))
                .build();
    }
}