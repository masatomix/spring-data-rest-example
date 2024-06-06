// src/main/java/com/example/demo/controller/UserController.java
package com.example.demo.controller;

import com.example.demo.entity.AppUser;
import com.example.demo.service.AppUserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
// import org.springframework.web.client.HttpClientErrorException.BadRequest;
// import org.springframework.web.client.HttpServerErrorException.InternalServerError;

import java.util.List;

@RestController
@RequestMapping("/customized_users")
@Tag(name = "Customized Users", description = "Controllerから自前で作成したAPI。左記の名前がClientライブラリ名になる")
public class AppUserController {
    @Autowired
    private AppUserService appUserService;

    @GetMapping
    // operationId がメソッド名になる
    @Operation(operationId = "getAllCustomizedUsers", summary = "サンプル(summary)", description = "サンプル(desc) ", tags = {
            "sampleRequests" }, responses = { 
                    // @ApiResponse(responseCode = "200", description = "200 (OK)", content = {
                    //         @Content(mediaType = "application/json", schema = @Schema(implementation = AppUser.class))
                    // }),
                    @ApiResponse(responseCode = "200", description = "200 (OK)", content = {
                            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = AppUser.class)))
                    }),
                    // @ApiResponse(responseCode = "400", description = "400 (Bad Request)", content = {
                    //         @Content(mediaType = "application/json", schema = @Schema(implementation = BadRequest.class))
                    // }),
                    // @ApiResponse(responseCode = "500", description = "500 (Internal Server    Error)", content = {
                    //         @Content(mediaType = "application/json", schema = @Schema(implementation = InternalServerError.class)) })
            })
    public List<AppUser> getAllUsers() {
        return appUserService.getAllUsers();
    }

    @GetMapping(path ="findAppUserById")
    public AppUser findAppUserById(String userId) {
        return appUserService.findAppUserById(userId);
    }

    @PostMapping
    public AppUser saveUser(@RequestBody AppUser user) {
        return appUserService.saveUser(user);
    }
}