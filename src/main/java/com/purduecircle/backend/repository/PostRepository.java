package com.purduecircle.backend.repository;

import com.purduecircle.backend.models.Post;
import com.purduecircle.backend.models.Topic;
import com.purduecircle.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
@Repository

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findAllByUser(User user);
    List<Post> findAllByTopic(Topic topic);
    List<Post> findAllByTopicAndUserIsNotIn(Topic topic, List<User> blockedUsers); //should work for topicline
    List<Post> findAllByTopicAndUserInAndUserIsNotIn(Topic topic, List<User> following, List<User> blocked); //should work for user timeline
    Post findByPostID(int postID);
//THIS WORKS------------------------------------------------------------------------------------------------------------
//    @Query("SELECT u FROM Post u WHERE u.topic = :topic AND u.user.userID NOT IN :blocked")
//    List<Post> findAllTopicPostsWithoutBlocked(@Param("topic") Topic topic, @Param("blocked") List<Integer> blocked);

    @Query ("SELECT u FROM Post u WHERE u.topic = :topic AND u.user NOT IN " +
            "(SELECT v.blockedUser FROM UserBlocked v WHERE v.user = :user)")
    List<Post> findAllTopicPostsWithoutBlocked(@Param("topic") Topic topic, @Param("user") User user);

//    @Query("SELECT u FROM Post u WHERE u.user = :user AND u.user ")
//    List<Post> findAllPostsByUser@Param("user") User user, );


    List<Post> findAllByUserAndImagePathNotNull(User user);

    @Query("SELECT p FROM Post p WHERE (p.user IN (SELECT u.user FROM UserFollower u WHERE u.follower = :user) OR p.user = :user) " +
            "OR (p.user NOT IN (SELECT b.blockedUser FROM UserBlocked b WHERE b.user = :user) AND p.topic IN (SELECT t FROM TopicFollower t WHERE t.follower = :user) )")
    List<Post>findAllUserTimelinePosts(@Param("user") User user);

    @Query("")
    List<Post> getHotTimeline(@Param("user") User user);

    List<Post> findByTimePostedGreaterThanEqualOrderByTimePostedDesc(Timestamp yesterday);
}
