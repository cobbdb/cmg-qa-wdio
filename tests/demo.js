var hostname = 'http://www.tie3.palmbeachdailynews.com',
    commentId = '' + global.Math.random();

describe('Janrain', function () {
    it('can login', function () {
        return browser.
            url(hostname).
                waitForExist('#capture_signIn_traditionalSignIn_emailAddress').
                click('#cm-user-icon').
                setValue('#capture_signIn_traditionalSignIn_emailAddress', 'cmg.medhini+hatcher@gmail.com').
                setValue('#capture_signIn_traditionalSignIn_password', 'password1').
                click('#capture_signIn_traditionalSignIn_signInButton').
                waitUntil(function () {
                    return this.getHTML('#cmUserNameUpdate', false).then(function (name) {
                        return name !== 'AnonymousUser';
                    });
                }).
                getHTML('#cmUserNameUpdate', false).then(function (name) {
                    expect(name).toEqual('hatcher001');
                });
    });
});
describe('Comments widget', function () {
    it('can post new comments', function () {
        return browser.
            url(hostname + '/feed/business/personal-finance/platinum-paternity-leave-at-obama-campaign-agency/fWRgC').
                waitForExist('#comment_post_form').
                setValue('#comment_post_form > textarea', 'test comment id: ' + commentId).
                click('#comment_post_form > input.cmCommentSubmitBtn').
                waitUntil(function () {
                    return this.getValue('#comment_post_form > input.cmCommentSubmitBtn').then(function (value) {
                        return value === 'Post comment';
                    });
                }).
                getHTML('.cmListItem:last-child p', false).then(function (comment) {
                    expect(comment).toMatch(commentId);
                });
    });
    it('can view the total comment count', function () {
        return browser.
            getHTML('span.cmListItemCount:nth-child(1)', false).then(function (text) {
                expect(text).toMatch('Comment');
            });
    });
});
