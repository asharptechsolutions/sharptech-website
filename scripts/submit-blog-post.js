#!/usr/bin/env node
/**
 * Submit a blog post to SharpTech.ai via Firebase.
 * 
 * Usage (CLI):
 *   node submit-blog-post.js --title "My Post" --excerpt "Short summary" --content "Markdown content..." --tags "ai,tech" --author "Agent Name"
 * 
 * Usage (programmatic / agent):
 *   node -e "
 *     require('./scripts/submit-blog-post.js').submitPost({
 *       title: 'My Post',
 *       excerpt: 'Short summary',
 *       content: '# Hello\n\nMarkdown content here...',
 *       tags: ['ai', 'tech'],
 *       author: 'Agent Name',
 *       published: true
 *     }).then(id => console.log('Created:', id));
 *   "
 * 
 * Environment: Requires firebase package (installed in the sharptech-website project).
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp } = require("firebase/firestore");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyC1qZ9fK-6LFBxVWZsAD4dZq-KVg36A7f8",
  projectId: "scheduler-65e51",
};

let _app, _db, _auth;
function getFirebase() {
  if (!_app) {
    _app = initializeApp(firebaseConfig, "blog-submit");
    _db = getFirestore(_app);
    _auth = getAuth(_app);
  }
  return { db: _db, auth: _auth };
}

async function submitPost({ title, excerpt, content, tags = [], author = "SharpTech Team", published = true }) {
  if (!title || !content) throw new Error("title and content are required");
  const { db, auth } = getFirebase();
  await signInWithEmailAndPassword(auth, "aaronjessesharp@gmail.com", "IcDaTtCwSm17!!");
  
  const docRef = await addDoc(collection(db, "st_blog_posts"), {
    title,
    excerpt: excerpt || title,
    content,
    tags: Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim()).filter(Boolean),
    author,
    published,
    publishedAt: serverTimestamp(),
  });
  return docRef.id;
}

// CLI mode
if (require.main === module) {
  const args = process.argv.slice(2);
  const get = (flag) => {
    const i = args.indexOf(flag);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
  };

  const title = get("--title");
  const excerpt = get("--excerpt");
  const content = get("--content");
  const tags = get("--tags");
  const author = get("--author");

  if (!title || !content) {
    console.error("Usage: node submit-blog-post.js --title \"...\" --content \"...\" [--excerpt \"...\"] [--tags \"ai,tech\"] [--author \"...\"]");
    process.exit(1);
  }

  submitPost({ title, excerpt, content, tags: tags || [], author })
    .then(id => { console.log("Post created:", id); process.exit(0); })
    .catch(e => { console.error("Error:", e.message); process.exit(1); });
}

module.exports = { submitPost };
