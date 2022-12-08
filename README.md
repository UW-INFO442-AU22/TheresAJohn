# TheresAJohn - Website for rural area K-8 students
Lei Lei, Miranda Ma, John Nguyen, Alina Wang, Jerry Wu

## Mission Statement

#### SDG and general problem domain:
The SDG we are aiming to solve is quality education. Specifically, we are targeting the
issue of lack of resources, such as teaching and learning equipments.

#### How might we...
How might we provide more teaching/learning resources for K-8 schools in rural
areas?

## Why we are building it
We will serve as a middleman to connect schools/teachers with donors for their needs of technologies and teaching
resources. 

## What we are building

### P0:
* Resource Board Page (schools can post about their needs of physical resources)
* Running Database: 
  *   School Name
  *   User Name
  *   User Email
  *   School Address
  *   Resources Needed
  *   Deadline for Resources
  *   Notes 
* School/user log-in/authentication

### P1:
* Process bar (to show users how many resources are still needed)
* Sort and filter tutors (adds up to display tutor page)
* Verify school with a recognized accrediting body or Educational Service District (ESD).

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
- pass in body: { contact, link, resource, quantity, deadline, description }
- creates post, saves in database
- returns { status: 'success' } if success

#### /api/posts/complete PATCH
- pass in body: { postID }
- marks post as complete, saves in database
- returns { status: 'success' } if success

#### /api/posts/ PATCH
- pass in body: { resource, quantity, deadline, description, contact, link, postId }
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
* description: { type: String, default: null },
* completed: { type: Boolean, default: false },
* datePosted: { type: Date }

### User
* fullName: { type: String, default: null }
* email: { type: String, unique: true }
* password: { type: String } -- encrypted
* schoolName: { type: String, default: null }
* schoolAddress: { type: String, default: null }