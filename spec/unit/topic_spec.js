const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
                title: "Favorite movies",
                description: "Lets discuss our favorite movies"

            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "National Treasure",
                    body: "Best movie ever.",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {
        it("should create a topic object with a title and description", (done) => {

            Topic.create({
                title: "Favorite movies",
                description: "Lets discuss our favorite movies",
            })
            .then((topic) => {
                expect(topic.title).toBe("Favorite movies");
                expect(topic.description).toBe("Lets discuss our favorite movies");
                done();
            });
        });
        it("should not create a topic with missing title or description", (done) => {
            Topic.create({
                title: "Favorite movies",
                description: "Lets discuss our favorite movies",

            })
            .then((topic) => {

                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Topic.title cannot be null");
                expect(err.message).toContain("Topic.description cannot be null");
                done();
            })
        });
    });

    describe("#getPosts()", () => {
        it("should return the associated posts with title and body for a topic", (done) => {

       this.topic.getPosts()
       .then((posts) => {
       expect(posts[0].title).toBe("National Treasure");
       expect(posts[0].body).toBe("Best movie ever.");
       done();
            });
        });
    });
});
