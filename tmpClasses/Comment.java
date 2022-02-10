/**
*
* Represents a commment on a post
*
* @author Nicholas Fang, Nicholas Gorki, Ron Kovler, Ryan Lechner, Jessica Majors
* @version {date}
* 
**/

import java.time.LocalDateTime;

public class Comment {

    public Comment(String content, User user) {
        this.content = content;
        this.user = user;
    }

    /*
    * Class variables
    */

    /* Text, picture, or URL data in content */
    private String content;

    /* User that made post */
    private User user;

    private LocalDateTime timePosted;

    /*
    * Getters and setters
    */

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getTimePosted() {
        return timePosted;
    }

}