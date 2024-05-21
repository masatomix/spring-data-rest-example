INSERT INTO
    USERS (id, first_name, last_name, password)
VALUES
    (1, 'Smith', 'James', 'password');

INSERT INTO
    USERS (id, first_name, last_name, password)
VALUES
    (2, 'Anderson', 'Christopher', 'password');

INSERT INTO
    POSTS(id, title, content, user_id, published)
VALUES
    (1, 'post1', 'post1-content', 1, 0);

INSERT INTO
    POSTS(id, title, content, user_id, published)
VALUES
    (2, 'post2', 'post2-content', 1, 1);

INSERT INTO
    POSTS(id, title, content, user_id, published)
VALUES
    (3, 'post3', 'post3-content', 2, 0);