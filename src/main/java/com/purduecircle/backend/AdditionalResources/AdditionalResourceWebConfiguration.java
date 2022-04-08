package com.purduecircle.backend.AdditionalResources;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AdditionalResourceWebConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:///home/ubuntu/server/userImages/");

        registry.addResourceHandler("/UI_images/**")
                .addResourceLocations("file:///home/ubuntu/server/serverImages/");
    }


}