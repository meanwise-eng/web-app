//var skills = new Macy({
//    container: '#skills',
//    trueOrder: false,
//    waitForImages: false,
//    useOwnImageLoader: false,
//    debug: true,
//    mobileFirst: true,
//    columns: 1,
//    margin: 15,
//    breakAt: {
//        1200: 2,
//        940: 3,
//        520: 3,
//        400: 2
//    }
//});

//var masonry = new Macy({
//    container: '#collections',
//    trueOrder: false,
//    waitForImages: false,
//    useOwnImageLoader: false,
//    debug: true,
//    mobileFirst: true,
//    columns: 1,
//    margin: {
//        x: 45,
//        y: 15
//    },
//    breakAt: {
//        1200: 2,
//        940: 2,
//        520: 2,
//        400: 1
//    }
//});

var base_uri = 'http://localhost:8000/api/v4/';
var itemCount = 30;

var ProfileDescriptionView = Backbone.View.extend({
    initialize: function() {
        var _this = this;
        $(_this.el).html('loading');
        var creditsReq = $.ajax({
            url: base_uri + 'user/'+this.model.user_id+'/credits/'
        }).done(function(resp) {
            _this.credits = resp.results;
            _this.render();
        });
    },
    render: function() {
        var template_src = document.getElementById('portfolio-details').innerHTML;
        var template = Handlebars.compile(template_src);
        $(this.el).html(template({'profile': this.model, 'credits': this.credits}));

        var skills = new Macy({
            container: '#' + this.el.id + ' #skills',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: 15,
            breakAt: {
                1200: 2,
                940: 3,
                520: 3,
                400: 2
            }
        });
    }
});

var ProfilePortfolioImageDisplay = Backbone.View.extend({
    tagName: 'a',
    attributes: function() {
        return {
            href: 'user/'+this.model.topic.user_id+'/topic/'+this.model.topic.topic,
            'style': 'background: url("'+this.model.post.post_thumbnail_url+'") center;',
        }
    }
});

var ProfilePortfolioTextDisplay = Backbone.View.extend({
    tagName: 'div',
    attributes: {
        style: 'border-radius: 10px; overflow: hidden;',
    },
    events: {
        'resize': 'resize',
    },
    render: function() {
        var width = this.model.size == 'large' ? 342 : 166;
        var height = this.model.size == 'large' ? 180 : 90;
        this.$el.append('<canvas class="canvas" width="'+width+'" height="'+height+'"></canvas>');
        var canvas = this.$('.canvas')[0];
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#555';
        ctx.fillRect(0, 0, width, height);
        
        var fontSize = 10;
        var topPadding = 15;
        var sidePadding = 15;
        var lineSpacing = 0.0;

        ctx.fillStyle = '#DDD';
        var finalPass = false;

        for (var a=0; a<100; a++) {
            var textAreaWidth = width - (sidePadding*2);
            var noOfLines = Math.floor((height - (topPadding*2)) / (fontSize+Math.floor(lineSpacing)));
            ctx.font = fontSize + 'px serif';

            var lines = [];
            var textArr = this.model.post.text.split(" ");
            var currentLine = 1;
            for (var i=1; i<=textArr.length; i++) {
                var currentText = textArr.slice(0, i);
                var measurement = ctx.measureText(currentText.join(" "));
                if (measurement.width > textAreaWidth) {
                    lines.push(textArr.slice(0, i-1).join(" "));
                    textArr = textArr.slice(i-1);
                    i = 0;
                }
            }
            if (i != 0) {
                lines.push(textArr.join(" "));
            }

            if (finalPass) {
                break;
            } else if ((lines.length * fontSize) + (topPadding*2) > height) {
                fontSize -= 1;
                lineSpacing -= 0.2;
                topPadding -= 0.2;
                sidePadding -= 0.2;
                finalPass = true;
            } else {
                fontSize += 1;
                lineSpacing += 0.2;
                topPadding += 0.2;
                sidePadding += 0.2;
            }
        }
        ctx.textAlign = 'center';
    
        for (var i in lines) {
            var textHeight = ((lines.length * (fontSize+Math.floor(lineSpacing))));
            var heightRemaining = height - textHeight;
            var verticalPadding = (heightRemaining/2)/2;
            var y = fontSize + verticalPadding + (i*(fontSize+Math.floor(lineSpacing)));
            ctx.fillText(lines[i], width/2, y);
        }
    },
    resize: function() {
        var width = this.el.offsetWidth;
        var height = this.el.offsetHeight;

        var $div = $(this.div);

        var fontSize = 10;
        var offsetHeight = 10;
        var count = 0;
        var parentWidth = (this.el.offsetWidth * 0.95);
        var fontMax = (this.el.offsetWidth * 0.12);

        while ((fontSize < fontMax && this.el.children[0].offsetHeight < parentWidth) && count < 100) {
            fontSize += 1;
            $div.css('font-size', fontSize+'px');
            count++;
        }
        if (div.children[0].offsetHeight > parentWidth) {
            $div.css('font-size', (fontSize-10)+'px');
        }
    }
});

var ProfilePortfolioGrid = Backbone.View.extend({
    className: 'column',
    render: function() {
        var topic = this.model;

        var templates = [];
        var topic_template1_src = document.getElementById("portfolio-topic-collection-1").innerHTML;
        templates[0] = Handlebars.compile(topic_template1_src);
        var topic_template2_src = document.getElementById("portfolio-topic-collection-2").innerHTML;
        templates[1] = Handlebars.compile(topic_template2_src);
        var topic_template3_src = document.getElementById("portfolio-topic-collection-3").innerHTML;
        templates[2] = Handlebars.compile(topic_template3_src);

        var postDisplayViews = {
            'image': 'ProfilePortfolioImageDisplay',
            'text': 'ProfilePortfolioTextDisplay',
        };

        var templateNo = topic.top_posts.length;
        if (templateNo > 3) {
            templateNo = 3;
        }

//        var GridTypes = ['ProfilePortfolioGridOne', 'ProfilePortfolioGridTwo', 'ProfilePortfolioGridThree'];
//        var grid = new window[gridTypes[templateNo-1]]({model: topic});
//
//        this.$el.append(grid.el);

        var templateNo = topic.top_posts.length;
        if (templateNo > 3) {
            templateNo = 3;
        }
        var template = templates[templateNo-1];

        var html = template(topic);
        this.$el.append(html);

        for (var j=0; j<3; j++) {
            if (!(j in topic.top_posts)) {
                break;
            }
            var post = topic.top_posts[j];
            if (j == 0) {
                if (templateNo == 1 || templateNo == 3) {
                    var className = 'collection-hero';
                    var size = 'large';
                } else {
                    var className = 'collection-first';
                    var size = 'small';
                }
                var row = 'one';
            } else if (j == 1) {
                if (templateNo == 2) {
                    var className = 'collection-second';
                    var size = 'small';
                    var row = 'one';
                } else {
                    var className = 'collection-first';
                    var size = 'small';
                    var row = 'two';
                }
            } else {
                var className = 'collection-second';
                var row = 'two';
                var size = 'small';
            }
            var postType = post.post_thumbnail_url === null ? 'text' : 'image';
            var postDisplay = new window[postDisplayViews[postType]]({model: {
                post: post,
                topic: topic,
                size: size,
            }, className: 'column '+className});
            this.$('.row.'+row).append(postDisplay.el);
            postDisplay.render();
        }
    }
});

var ProfilePortfolioGridOne = Backbone.View.extend({

});

var ProfilePortfolioGridTwo = Backbone.View.extend({

});

var ProfilePortfolioGridThree = Backbone.View.extend({

});

var ProfilePortfolioView = Backbone.View.extend({
    initialize: function() {
        var _this = this;
        $(_this.el).html('loading');
        $.ajax({
            url: base_uri + 'user/'+this.model.user_id+'/user-topics/',
            success: function(resp) {
                _this.render(resp);
            }
        });
    },
    render: function(resp) {
        this.$el.html('');

        for (var i in resp.results.user_topics) {
            var topic = resp.results.user_topics[i];
            topic.user_id = this.model.user_id;
            var profilePortfolioView = new ProfilePortfolioGrid({model: topic});
            this.$el.append(profilePortfolioView.el);
            profilePortfolioView.render();
        }
        var masonry = new Macy({
            container: '#'+this.el.id,
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: {
                x: 45,
                y: 15
            },
            breakAt: {
                1200: 2,
                940: 2,
                520: 2,
                400: 1
            }
        });
    }
});

var PostGridDisplay = Backbone.View.extend({
    render: function() {
        var template_src = document.getElementById('posts-grid-display').innerHTML;
        var template = Handlebars.compile(template_src);
        this.$el.append(template(this.model));

        var postDisplayView = {
            'image': 'PostGridImageDisplay',
            'video': 'PostGridImageDisplay',
            'text': 'PostGridTextDisplay',
            'link': 'PostGridTextDisplay',
        };
        var postDisplay = new window[postDisplayView[this.model.post_type]]({model: this.model});
        this.$('.post-display').append(postDisplay.el);
        postDisplay.render();
    }
});

var PostGridImageDisplay = Backbone.View.extend({
    tagName: 'img',
    attributes: function() {
        return {
            'class': 'post-content',
            src: this.model.post_thumbnail_url
        };
    }
});

var PostGridTextDisplay = Backbone.View.extend({
    tagName: 'div',
    attributes: {
        style: 'background-color: #555; color: #ddd; width: 252px; height: 252px; padding: 5px;' +
            'font-weight: bold; text-align: center; display: table; border-radius: 15px; margin-bottom: 1rem;',
    },
    render: function() {
        var fontSize = 40;
        var offsetHeight = 10;
        var count = 0;
        this.$el.append('<span style="display: table-cell; vertical-align: middle;">'+this.model.text+'</span>');
        this.$el.css('font-size', '40px');

        var parentWidth = (this.el.offsetWidth * 0.95);
        var fontMax = (this.el.offsetWidth * 0.12);

        while ((fontSize < fontMax && this.el.children[0].offsetHeight < parentWidth) && count < 100) {
            fontSize += 20;
            this.$el.css('font-size', fontSize+'px');
            count++;
        }
        if (this.el.children[0].offsetHeight > 620) {
            this.$el.css('font-size', (fontSize-20)+'px');
        }
    }
});

var ExploreSkillsView = Backbone.View.extend({
    initialize: function() {
        var skills = [];;
        var max = 239;
        var min = 93;
        var slot = 1;
        for (var i in this.model.skills) {
            var skill = this.model.skills[i];
            var random = Math.floor(Math.random() * (max - min) + min);
            var color = null;
            switch (slot) {
                case 1:
                    color = {r: random, g: min, b: max};
                    break;
                case 2:
                    color = {r: random, g: max, b: min};
                    break;
                case 3:
                    color = {r: max, g: random, b: min};
                    break;
                case 4:
                    color = {r: min, g: random, b: max};
                    break;
                case 5:
                    color = {r: max, g: min, b: random};
                    break;
                case 6:
                    color = {r: min, g: max, b: random};
                    break;
                default:
                    console.log("Invalid slot: " + slot);
                    break;
            }
            var old_slot = slot;
            while (old_slot == slot) {
                slot = Math.floor(Math.random() * (6 - 1) + 1);
            }
            skill.color = color;
            skills.push(skill);
        }
        this.model.skills = skills;
    },
    render: function() {
        var template_src = document.getElementById('skills-template').innerHTML;
        var template = Handlebars.compile(template_src);

        this.$el.html(template(this.model));

        var masonry = new Macy({
            container: '#topics',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: {
                x: 30,
                y: 30
            },
            breakAt: {
                1200: 4,
                940: 4,
                520: 3,
                400: 2
            }
        });
    }
});

var PortfolioPostView = Backbone.View.extend({
    initialize: function() {
        var postsReq = this.model.requestPaginator.prime();
        $.when(this.model.profileRequest, postsReq).done(function(profileRes, postsRes) {
            this.render(profileRes[0].results, postsRes[0].results);
        }.bind(this));
    },
    render: function(profile, posts) {
        var template_src = document.getElementById('portfolio-profile-bar').innerHTML;
        var posts_template_src = document.getElementById('posts-grid').innerHTML;
        profile_bar_template = Handlebars.compile(template_src);
        posts_template = Handlebars.compile(posts_template_src);
        this.$el.html('');
        this.$el.append(profile_bar_template(profile));
        this.$el.append(posts_template({posts: posts, topic: this.model.topic}));

        this.addPosts(posts);

        this.masonry = new Macy({
            container: '#posts-container',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: 24,
            breakAt: {
                1200: 4,
                940: 5,
                520: 3,
                400: 2
            }
        });
    },
    addPosts: function(posts) {
        for (var i in posts) {
            var post = posts[i];
            var postDisplay = new PostGridDisplay({model: post});
            this.$('#posts-container').append(postDisplay.el);
            postDisplay.render();
        }

        if (this.masonry) {
            this.masonry.recalculate();
        }

        if (this.model.requestPaginator.hasPrevious()) {
            $(window).on('scroll', function() {
                if ($(window).scrollTop() + $(window).height() > $(document).height()-50) {
                    $(window).off('scroll');
                    this.model.requestPaginator.previous().done(function(resp) {
                        this.addPosts(resp.results);
                    }.bind(this));
                }
            }.bind(this)); 
        }
    },
});

var ExplorePostsView = Backbone.View.extend({
    initialize: function() {
        this.model.requestPaginator.prime().done(function(resp) {
            this.render(resp.results);
        }.bind(this));
    },
    render: function(posts) {
        var template_src = document.getElementById('explore-posts-template').innerHTML;
        var template = Handlebars.compile(template_src);
        this.$el.html(template(posts));

        this.masonry = new Macy({
            container: '#posts-container',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: 24,
            breakAt: {
                1200: 4,
                940: 5,
                520: 3,
                400: 2
            }
        });

        this.addPosts(posts);
    },

    addPosts: function(posts) {
        for (var i in posts) {
            var post = posts[i];
            var postDisplay = new PostGridDisplay({model: post});
            this.$('#posts-container').append(postDisplay.el);
            postDisplay.render();
        }

        this.masonry.recalculate();

        if (this.model.requestPaginator.hasPrevious()) {
            $(window).on('scroll', function() {
                if ($(window).scrollTop() + $(window).height() > $(document).height()-50) {
                    $(window).off('scroll');
                    this.model.requestPaginator.previous().done(function(resp) {
                        this.addPosts(resp.results);
                    }.bind(this));
                }
            }.bind(this)); 
        }
    }

});

var PostImageDisplayView = Backbone.View.extend({
    tagName: 'img',
    attributes: function() {
        return {
            src: this.model.image_url,
            width: this.model.resolution.width,
            height: this.model.resolution.height,
            style: 'background-color: #fafafa;',
        };
    },
});

var PostVideoDisplayView = Backbone.View.extend({
    tagName: 'video',
    events: {
        'click': 'toggleAudio',
    },
    attributes: function() {
        return {
            autoplay: true,
            loop: true,
            controls: false,
            muted: true,
            preload: 'auto',
            poster: this.model.video_thumbnail_url,
            width: 640,
            src: this.model.video_url,
            style: 'background-color: #fafafa;',
        };
    },
    toggleAudio: function() {
        var muted = this.$el.attr('muted');
        if (muted == 'true') {
            this.$el.attr('muted', null);
        } else {
            this.$el.attr('muted', true);
        }
    }
});

var PostTextDisplayView = Backbone.View.extend({
    tagName: 'div',
    attributes: {
        style: 'background-color: #555; width: 640px; height: 640px; color: #ddd; ' +
            'font-weight: bold; text-align: center; padding: 30px; display: table;',
    },
    render: function() {
        var fontSize = 40;
        var offsetHeight = 10;
        var count = 0;
        this.$el.append('<span style="display: table-cell; vertical-align: middle;">'+this.model.text+'</span>');
        this.$el.css('font-size', '40px');

        while ((fontSize < 80 && this.el.children[0].offsetHeight < 620) && count < 100) {
            fontSize += 20;
            this.$el.css('font-size', fontSize+'px');
            count++;
        }
        if (this.el.children[0].offsetHeight > 620) {
            this.$el.css('font-size', (fontSize-20)+'px');
        }
    }
});

var PostDetailView = Backbone.View.extend({
    initialize: function() {
        var postsReq = this.model.requestPaginator.prime();
        $.when(postsReq, this.model.commentsReq, this.model.postReq)
        .done(function(postsRes, commentsRes, postRes) {
            var post = postRes[0].results;
            var profileReq = $.get(base_uri+'user/'+post.user_id+'/userprofile/');
    
            var comments = commentsRes[0].results.data.map(function(item) {
                item.created_on = +(new Date(item.created_on));
                return item;
            });
    
            profileReq.done(function(profileRes) {
                this.render(postsRes[0].results, profileRes.results, post, comments);
            }.bind(this));
        }.bind(this));
    },
    render: function(posts, profile, post, comments) {
        var profile_template_src = document.getElementById('portfolio-profile-bar').innerHTML;
        var related_post_template_src = document.getElementById('explore-posts-template').innerHTML;

        var postDisplayView = {
            'image': 'PostImageDisplayView',
            'video': 'PostVideoDisplayView',
            'text': 'PostTextDisplayView',
        };

        var detail_template_src = document.getElementById('post-details-template').innerHTML;

        var detail_template = Handlebars.compile(detail_template_src);
        var profile_template = Handlebars.compile(profile_template_src);
        var related_post_template = Handlebars.compile(related_post_template_src);
        this.$el.html(
            profile_template(profile) +
            detail_template(post) +
            related_post_template({topic: 'Similar Posts', posts: posts})
        );

        var postDisplay = new window[postDisplayView[post.post_type]]({model: post});
        this.$('#post-display').append(postDisplay.el);
        postDisplay.render();

        this.addPosts(posts);
        this.masonry = new Macy({
            container: '#posts-container',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: 24,
            breakAt: {
                1200: 4,
                940: 5,
                520: 3,
                400: 2
            }
        });
    },

    addPosts: function(posts) {
        for (var i in posts) {
            var post = posts[i];
            var postDisplay = new PostGridDisplay({model: post});
            this.$('#posts-container').append(postDisplay.el);
            postDisplay.render();
        }

        if (this.masonry) {
            this.masonry.recalculate();
        }
        window.masonryObj1 = this.masonry;

        if (this.model.requestPaginator.hasPrevious()) {
            $(window).on('scroll', function() {
                if ($(window).scrollTop() + $(window).height() > $(document).height()-50) {
                    $(window).off('scroll');
                    this.model.requestPaginator.previous().done(function(resp) {
                        this.addPosts(resp.results);
                    }.bind(this));
                }
            }.bind(this)); 
        }
    }
});

MainNavView = Backbone.View.extend({
    events: {
        "submit form": "search",
    },

    initialize: function() {
        var params = new URLSearchParams(document.location.search.substring(1));
        var search = params.get('search');
        if (search) {
            this.$('#search').val(search);
        }
    },

    search: function(e) {
        e.preventDefault();
        var keyword = this.$('#search').val();
        var path = document.location.pathname;
        if (path.indexOf("explore/") != -1) {
            var url = path + '?search='+keyword;
        } else if (path.indexOf("user/") != -1 && path.indexOf("topic/") != -1) {
            var url = path + '?search='+keyword;
        } else {
            var url = 'explore/search?search='+keyword;
        }
        router.navigate(url, {trigger: true});
        return;
        var requestPaginator = new RequestPaginator(url);

        var explorePostView = new ExplorePostsView({
            el: '#main',
            model: {requestPaginator: requestPaginator},
        });
    },
});

PortfolioRouter = Backbone.Router.extend({
    routes: {
        "user/:username": "user_by_username",
        "user/:user_id/topic/:topic(?search=:keyword)": "portfolio_topic",
        "explore": "explore",
        "explore/search?:keyword": "explore_search",
        "explore/:topic(?search=:keyword)": "explore_topic",
        "posts/:post_id": "post_details",
    },

    user_by_username: function(username) {
        var profileReq = $.ajax({
            url: 'http://localhost:8000/api/v4/user/by-username/'+username+'/userprofile/'
        }).done(function(profileRes) {
            var profilePortfolioView = new ProfilePortfolioView({
                el: '#collections',
                model: profileRes.results
            });
            var profileDescriptionView = new ProfileDescriptionView({
                el: '#profile-cover',
                model: profileRes.results
            });

        });
    },

    portfolio_topic: function(user_id, topic, keyword) {
        var profileReq = $.get(base_uri + 'user/'+user_id+'/userprofile/');
        var url = base_uri + 'posts/explore/?item_count='+itemCount+'&topic_texts='+topic+'&user_id='+user_id;
        if (keyword) {
            url += '&search='+keyword;
        }
        var requestPaginator = new RequestPaginator(url);
        var portfolioPostView = new PortfolioPostView({
            el: '#main',
            model: {
                profileRequest: profileReq,
                requestPaginator: requestPaginator,
                topic: topic
            }
        });
        portfolioPostView.render();
    },

    explore: function() {
        var topics = $.get(base_uri + 'skill/');
        topics.done(function(resp) {
            var exploreSkillsView = new ExploreSkillsView({
                model: {skills: resp.results.data},
                el: '#main'
            });
            exploreSkillsView.render();
        });
    },

    explore_topic: function(topic, keyword) {
        var url = base_uri + 'posts/explore/?item_count='+itemCount+'&topic_texts='+topic;
        if (keyword) {
            url += '&search='+keyword;
        }
        var requestPaginator = new RequestPaginator(url);

        var explorePostsView = new ExplorePostsView({
            el: '#main',
            model: {
                requestPaginator: requestPaginator,
                topic: topic,
            }
        });
        explorePostsView.render();
    },

    explore_search: function(keyword) {
        var url = base_uri + 'posts/explore/?item_count='+itemCount;
        if (keyword) {
            url += '&search='+keyword;
        }
        var requestPaginator = new RequestPaginator(url);

        var explorePostsView = new ExplorePostsView({
            el: '#main',
            model: {
                requestPaginator: requestPaginator,
                topic: "Search '"+keyword+"'",
            }
        });
        explorePostsView.render();
    },

    post_details: function(post_id) {
        var postReq = $.get(base_uri + 'posts/'+post_id+'/');
        var commentsReq = $.get(base_uri + 'posts/'+post_id+'/comments/');
        var requestPaginator = new RequestPaginator(base_uri + 'posts/'+post_id+'/related/?item_count='+itemCount);

        var postDetailView = new PostDetailView({
            el: '#main',
            model: {
                requestPaginator: requestPaginator,
                postReq: postReq,
                commentsReq: commentsReq,
            }
        });
    }
});

$.when($.ready).then(function() {
    HandlebarsIntl.registerWith(Handlebars);
    var router = new PortfolioRouter();
    window.router = router;
    Backbone.history.start({pushState: true});

    var mainNavView = new MainNavView({el: '#main-nav'});
    //router.navigate('/user/by-username/max9xs', {trigger: true});
});
