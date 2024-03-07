//package com.i0xnaveen.quizbckendonline.Config;
//
//import com.auth0.jwt.JWT;
//import com.auth0.jwt.JWTVerifier;
//import com.auth0.jwt.algorithms.Algorithm;
//import com.auth0.jwt.interfaces.DecodedJWT;
//import com.i0xnaveen.quizbckendonline.model.Users;
//import com.i0xnaveen.quizbckendonline.service.UserService;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import lombok.Value;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.stereotype.Component;
//
//import java.time.Instant;
//import java.util.Base64;
//import java.util.Collections;
//import java.util.Date;
//import java.util.Optional;
//
//@RequiredArgsConstructor
//@Component
//public class UserAuthProvider {
//    private UserService userService;
//    @Value("${security.jwt.token.secret-key}")
//    private String secretkey;
//    @PostConstruct
//    public void init(){
//        secretkey= Base64.getEncoder().encodeToString(secretkey.getBytes());
//    }
//    public String createToken(String login){
//        Date now=new Date();
//        Date validity=new Date(now.getTime()+3_600_000);
//        return JWT.create()
//                .withIssuer(login)
//                .withIssuedAt(now)
//                .withExpiresAt(validity)
//                .sign(Algorithm.HMAC256(secretkey));
//    }
//
//public Authentication validateToken(String token){
//       JWTVerifier verifier= JWT.require(Algorithm.HMAC256(secretkey)).build();
//    DecodedJWT decoded=verifier.verify(token);
//    Optional<Users> users=userService.checklogin(decoded.getIssuer());
//    return new UsernamePasswordAuthenticationToken(users,null, Collections.emptyList());
//}
//
//}
