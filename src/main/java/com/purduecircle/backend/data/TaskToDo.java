package com.purduecircle.backend.data;
import org.springframework.data.annotation.Id;

/**
 * Creates object for maintaining tasks on server
 */
public class TaskToDo {
    @Id
    private String id;
    private String title;
    private Boolean completed;

    public TaskToDo(String title, Boolean completed){
        this.title = title;
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Boolean getCompleted() {
        return completed;
    }

}
