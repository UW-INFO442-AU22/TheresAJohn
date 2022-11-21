# TheresAJohn - Website for rural area K-8 students

## Server Endpoints

### / GET
- returns "Welcome" if not logged in
- returns "Hi <userFirstName>" if logged in

#### /register POST
- pass in body: { firstName, lastName, email, password }
- creates user account, saves in database
- returns { status: 'success' } if success

#### /signin GET
- pass in body: { email, password }
- signs in user, creates new session
- returns { status: 'success' } if success

#### /signout GET
- signs out user, destroys session
- redirects back to /

#### /error GET
- returns { status: 'error', error: "Server Error" }

#### /unauthorized GET
- returns { status: 'error', error: "Permission Denied" }

#### /delete DELETE
- pass in body: { userid }
- returns { status: 'success' } if success

### /api/posts
#### /api/posts/ GET
- returns "You've reached posts"

#### /api/posts/ POST
- pass in body: { resource, quantity, deadline, description }
- creates post, saves in database
- returns { status: 'success' } if success

#### /api/posts/complete PATCH
- pass in body: { postID }
- marks post as complete, saves in database
- returns { status: 'success' } if success

#### /api/posts/ PATCH
- pass in body: { resource, quantity, deadline, description, postId }
- patches existing post, saves in database
- returns { status: 'success' } if success

### /api/users
#### /api/users/ GET
- pass in query parameter: ?email=
- returns user info { _id, firstName, lastName, email, schoolName, schoolAddress } if success

#### /api/users/update PATCH 
- pass in { email, schoolName, schoolAddress, firstName, lastName }
    - only email is required
- patches existing user, saves in database
- returns { status: 'success' } if success


## Database Models

### Post
* userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
* resource: { type: String, default: null },
* quantity: { type: Number, default: 1 },
* deadline: { type: Date, default: new Date(9999, 12, 31) },
* description: { type: String, default: null },
* completed: { type: Boolean, default: false },
* datePosted: { type: Date }

### User
* firstName: { type: String, default: null }
* lastName: { type: String, default: null }
* email: { type: String, unique: true }
* password: { type: String } -- encrypted
* schoolName: { type: String, default: null }
* schoolAddress: { type: String, default: null }
