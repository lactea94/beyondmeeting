package com.ssafy.common.auth;


import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

@Component
@RequiredArgsConstructor
public class GoogleOauth implements SocialOauth {

    HttpTransport transport = new NetHttpTransport();
    JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
//    @Value("${sns.google.url}")
    private String GOOGLE_SNS_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
//    @Value("${sns.google.client.id}")
    private String GOOGLE_SNS_CLIENT_ID = "626473034699-c6sot6bgum8rli15rns2uiefcnbcedko.apps.googleusercontent.com";
//    @Value("${sns.google.callback.url}")
    private String GOOGLE_SNS_CALLBACK_URL = "http://localhost:8080/api/v1/auth/google/callback";
//    @Value("${sns.google.client.secret}")
    private String GOOGLE_SNS_CLIENT_SECRET = "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";
    private final String GOOGLE_SNS_TOKEN_BASE_URL = "https://oauth2.googleapis.com/token";
    @Override
    public String getOauthRedirectURL() {
        Map<String, Object> params = new HashMap<>();
        params.put("scope", "profile email");
        params.put("response_type", "code");
        params.put("client_id", GOOGLE_SNS_CLIENT_ID);
        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);

        String parameterString = params.entrySet().stream()
                .map(x -> x.getKey() + "=" + x.getValue())
                .collect(Collectors.joining("&"));

        return GOOGLE_SNS_BASE_URL + "?" + parameterString;
    }

    @Override
    public String requestAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> params = new HashMap<>();
        params.put("code", code);
        params.put("client_id", GOOGLE_SNS_CLIENT_ID);
        params.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
        params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity =
                restTemplate.postForEntity(GOOGLE_SNS_TOKEN_BASE_URL, params, String.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            System.out.println("responseEntity.getBody() = " + responseEntity.getBody());
//            System.out.println("responseEntity.getBody() = " + responseEntity.getBody());
            try {
                getUserInfo();
            } catch (GeneralSecurityException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return responseEntity.getBody();
        }
        return "구글 로그인 요청 처리 실패";
    }

    public void getUserInfo() throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(GOOGLE_SNS_CLIENT_ID))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();

// (Receive idTokenString by HTTPS POST)

        GoogleIdToken idToken = verifier.verify("eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhMDA2MjBjNWFhN2JlOGNkMDNhNmYzYzY4NDA2ZTQ1ZTkzYjNjYWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MjY0NzMwMzQ2OTktYzZzb3Q2Ymd1bThybGkxNXJuczJ1aWVmY25iY2Vka28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MjY0NzMwMzQ2OTktYzZzb3Q2Ymd1bThybGkxNXJuczJ1aWVmY25iY2Vka28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcwOTQwODIwODEwMTA4NDQ2ODIiLCJlbWFpbCI6Imxuczk2MDcxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im5Dem9vRWN6TTkwOE5TQ244QTdJcFEiLCJuYW1lIjoi4YSL4YSC4YSJ4YSC4YSLIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnlPWHFHem4tbW5famR2S1JtTnVBUDdIaEhDNnJrWFJWb1RVNlMzPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IuGEguGEieGEguGEiyIsImZhbWlseV9uYW1lIjoi4YSLIiwibG9jYWxlIjoia28iLCJpYXQiOjE2NDI1MTMyMTMsImV4cCI6MTY0MjUxNjgxM30.GiBDBk2SaL_kShVJohy3tQFaPnFaGA2Kt-1L_6zAp8i2Dm-Jx4SpD7jefmv81lgCflSMJPWfTRRl3vk1R5es7pZMjeoIm3wD3Ky64ztn2gA7B0QjcBj-GYohv2ymr2OWPqYX3-JL6tgulh_QElf9txMfd7CCAFf3oLatNGuC0uTQgFHsXJfZrmMXOGDI8xoZdYGEnlczFDCMU4ftTqp0AGlQz1HZhg0TJ8_UB8rDcKdEkRsIKeKDgpYA3JDGPbJUwLg9NQegmFoJeScwGmELkitEwKvhEZWbmcf38Yc7lLWYkP6z7n0qW4h20Ai2hwjKov7WlBN0NQeeNxyAJnYvgw");
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            // Print user identifier
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);
            // Get profile information from payload
            String email = payload.getEmail();
//            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            String email2 = (String) payload.get("email");
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String locale = (String) payload.get("locale");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");
            System.out.println("email = " + email);
            System.out.println("email2 = " + email2);
//            System.out.println("emailVerified = " + emailVerified);
            System.out.println("name = " + name);
            System.out.println("pictureUrl = " + pictureUrl);
            System.out.println("locale = " + locale);
            System.out.println("familyName = " + familyName);
            System.out.println("givenName = " + givenName);
            // Use or store profile information
            // ...

        } else {
            System.out.println("Invalid ID token.");
        }
    }

    //Java 표준 URL 통신 방식(Normal HTTP Request)
//    @Override
//    public String requestAccessToken(String code) {
//        try {
//            URL url = new URL(GOOGLE_SNS_TOKEN_BASE_URL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("POST");
//            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//            conn.setDoOutput(true);
//
//            Map<String, Object> params = new HashMap<>();
//            params.put("code", code);
//            params.put("client_id", GOOGLE_SNS_CLIENT_ID);
//            params.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
//            params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
//            params.put("grant_type", "authorization_code");
//
//            String parameterString = params.entrySet().stream()
//                    .map(x -> x.getKey() + "=" + x.getValue())
//                    .collect(Collectors.joining("&"));
//
//            BufferedOutputStream bous = new BufferedOutputStream(conn.getOutputStream());
//            bous.write(parameterString.getBytes());
//            bous.flush();
//            bous.close();
//
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//
//            StringBuilder sb = new StringBuilder();
//            String line;
//
//            while ((line = br.readLine()) != null) {
//                sb.append(line);
//            }
//
//            if (conn.getResponseCode() == 200) {
//                return sb.toString();
//            }
//            return "구글 로그인 요청 처리 실패";
//        } catch (IOException e) {
//            throw new IllegalArgumentException("알 수 없는 구글 로그인 Access Token 요청 URL 입니다 :: " + GOOGLE_SNS_TOKEN_BASE_URL);
//        }
//    }
}