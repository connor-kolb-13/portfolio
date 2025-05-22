// Get Element by Id
function r_e(id) {
  return document.getElementById(id);
}

// Navigation Bar & Content Containers
let homeContainer = r_e("homeContainer");
let aboutContainer = r_e("aboutContainer");
let skillsContainer = r_e("skillsContainer");
let experienceContainer = r_e("experienceContainer");
let projectsContainer = r_e("projectsContainer");
let contactContainer = r_e("contactContainer");
let adminContainer = r_e("adminContainer");

let contentContainers = [
  homeContainer,
  aboutContainer,
  skillsContainer,
  experienceContainer,
  projectsContainer,
  contactContainer,
  adminContainer,
];

let homeBtn = r_e("homeBtn");
let aboutBtn = r_e("aboutBtn");
let skillsBtn = r_e("skillsBtn");
let experienceBtn = r_e("experienceBtn");
let projectsBtn = r_e("projectsBtn");
let contactBtn = r_e("contactBtn");
let adminBtn = r_e("adminTab");

let navBtns = [
  homeBtn,
  aboutBtn,
  skillsBtn,
  experienceBtn,
  projectsBtn,
  contactBtn,
  adminBtn,
];

// Home Button Navbar
homeBtn.addEventListener("click", () => {
  // Hide old content/underline
  navBtns.forEach((button) => {
    button.classList.remove("is-underlined");
  });
  contentContainers.forEach((container) => {
    container.classList.add("is-hidden");
  });
  // display new content & underline
  homeContainer.classList.remove("is-hidden");
  homeBtn.classList.add("is-underlined");
});

// About Button Navbar
aboutBtn.addEventListener("click", () => {
  // Hide old content/underline
  navBtns.forEach((button) => {
    button.classList.remove("is-underlined");
  });
  contentContainers.forEach((container) => {
    console.log(container);
    container.classList.add("is-hidden");
  });
  // display new content & underline
  aboutContainer.classList.remove("is-hidden");
  aboutBtn.classList.add("is-underlined");
});

// Skills Button Navbar
skillsBtn.addEventListener("click", () => {
  // Hide old content/underline
  navBtns.forEach((button) => {
    button.classList.remove("is-underlined");
  });
  contentContainers.forEach((container) => {
    container.classList.add("is-hidden");
  });
  // display new content & underline
  genWordCloud();
  skillsContainer.classList.remove("is-hidden");
  skillsBtn.classList.add("is-underlined");
});

// Experience Button Navbar
experienceBtn.addEventListener("click", () => {
  // Hide old content/underline
  navBtns.forEach((button) => {
    button.classList.remove("is-underlined");
  });
  contentContainers.forEach((container) => {
    container.classList.add("is-hidden");
  });
  // display new content & underline
  experienceContainer.classList.remove("is-hidden");
  experienceBtn.classList.add("is-underlined");
});

// Contact Button Navbar
contactBtn.addEventListener("click", () => {
  // Hide old content/underline
  navBtns.forEach((button) => {
    button.classList.remove("is-underlined");
  });
  contentContainers.forEach((container) => {
    container.classList.add("is-hidden");
  });
  // display new content & underline
  contactContainer.classList.remove("is-hidden");
  contactBtn.classList.add("is-underlined");
});

// Projects Button Navbar
projectsBtn.addEventListener("click", () => {
  // Hide old content/underline
  navBtns.forEach((button) => {
    button.classList.remove("is-underlined");
  });
  contentContainers.forEach((container) => {
    container.classList.add("is-hidden");
  });
  // display new content & underline
  projectsContainer.classList.remove("is-hidden");
  projectsBtn.classList.add("is-underlined");
});

document.addEventListener("DOMContentLoaded", function () {
  homeBtn.classList.add("is-underlined");
});

// Admin Sign In
r_e("adminBtn").addEventListener("click", () => {
  r_e("signInModal").classList.add("is-active");
});

r_e("signInModalBg").addEventListener("click", () => {
  r_e("signInModal").classList.remove("is-active");
});

// Logging in a user
document.getElementById("loginform").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // TODO: Handle the logged-in user (e.g., redirect to another page)
      r_e("signInModal").classList.remove("is-active");
      r_e("signOutBtn").classList.remove("is-hidden");
      r_e("adminTab").classList.remove("is-hidden");
    })
    .catch((error) => {
      r_e("signInModal").classList.remove("is-active");
      var errorCode = error.code;
      var errorMessage = error.message;
      // TODO: Handle errors (e.g., show error message to user)
      console.error(
        "Error signing in with email and password",
        errorCode,
        errorMessage
      );
    });
});

// Admin Button Navbar
adminBtn.addEventListener("click", () => {
  // Hide old content/underline
  navBtns.forEach((button) => {
    button.classList.remove("is-underlined");
  });
  contentContainers.forEach((container) => {
    container.classList.add("is-hidden");
  });
  // display new content & underline
  adminContainer.classList.remove("is-hidden");
  adminBtn.classList.add("is-underlined");
});

// Sign User Out
r_e("signOutBtn").addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      r_e("adminTab").classList.add("is-hidden");
      r_e("signOutBtn").classList.add("is-hidden");
    })
    .catch((error) => {
      // An error happened.
      console.error("Error signing out", error);
      // TODO: Handle errors (e.g., display error message to user)
    });
});

// Event listener for your form submission
r_e("wordInputForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let db = firebase.firestore();

  const word = document.getElementById("wordInput").value.trim();
  if (word) {
    db.collection("skillsWordCloud")
      .add({
        word: word,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Word added to Firestore");
        // Clear the input field after submission
        document.getElementById("wordInput").value = "";
      })
      .catch((error) => {
        console.error("Error adding word to Firestore", error);
      });
  }
});

function genWordCloud() {
  let db = firebase.firestore();
  let wordCounts = {};

  db.collection("skillsWordCloud")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Split the 'word' field into individual skills
        let skills = doc.data().word.split(", ");
        skills.forEach((skill) => {
          skill = skill.trim();
          if (skill) {
            wordCounts[skill] = (wordCounts[skill] || 0) + 1;
          }
        });
      });

      let wordCloudArray = Object.keys(wordCounts).map((skill) => {
        return [skill, wordCounts[skill]];
      });

      // Generate the word cloud
      WordCloud(document.getElementById("wordCloud"), {
        list: wordCloudArray,
        gridSize: 30,
        weightFactor: 8,
        fontFamily: "Finger Paint, cursive, sans-serif",
        color: "random-dark",
        rotateRatio: 0,
        rotationSteps: 2,
        backgroundColor: "#dfe0e2",
      });
    })
    .catch((error) => {
      console.error("Error fetching skills: ", error);
    });
}

// Store skills with their document IDs
let skillsWithDocId = {};
let deletedSkills = new Set();

document.getElementById("deleteSkillBtn").addEventListener("click", () => {
  r_e("skillSet").classList.remove("is-hidden");
  firebase
    .firestore()
    .collection("skillsWordCloud")
    .get()
    .then((querySnapshot) => {
      skillsWithDocId = {}; // Reset
      querySnapshot.forEach((doc) => {
        const skills = doc.data().word.split(", ");
        skills.forEach((skill) => {
          if (!skillsWithDocId[skill]) {
            skillsWithDocId[skill] = [];
          }
          skillsWithDocId[skill].push(doc.id);
        });
      });
      displaySkills();
    })
    .catch((error) => {
      console.error("Error fetching skills: ", error);
    });
});

function displaySkills() {
  let count = 0;
  const uniqueSkills = Object.keys(skillsWithDocId);
  const skillsListDiv = document.getElementById("skillsList");
  skillsListDiv.innerHTML = "";
  const flexContainer = document.createElement("div");
  flexContainer.classList.add("skills-flex-container");

  uniqueSkills.forEach((skill) => {
    count += 1;
    const skillDiv = document.createElement("div");
    skillDiv.textContent = skill;
    skillDiv.classList.add("skill-item");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-skill");
    deleteBtn.onclick = () => {
      deletedSkills.add(skill); // Add skill to deletedSkills set
      skillDiv.remove();
    };

    skillDiv.appendChild(deleteBtn);
    flexContainer.appendChild(skillDiv);
  });
  console.log("Skill count - ", count);
  skillsListDiv.appendChild(flexContainer);
}

document.getElementById("saveDeleteSkills").addEventListener("click", () => {
  const skillsCollection = firebase.firestore().collection("skillsWordCloud");

  skillsCollection
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docSkills = doc.data().word.split(", ");
        const updatedSkills = docSkills
          .filter((s) => !deletedSkills.has(s))
          .join(", ");

        if (updatedSkills.length > 0) {
          skillsCollection.doc(doc.id).update({ word: updatedSkills });
        } else {
          skillsCollection.doc(doc.id).delete();
        }
      });
    })
    .then(() => {
      console.log("Skills updated");
      deletedSkills.clear(); // Clear the deleted skills set
      r_e("skillSet").classList.add("is-hidden");
    })
    .catch((error) => {
      console.error("Error updating documents: ", error);
    });
});

// Scroll Hint
document.querySelectorAll(".scrollable-section").forEach((section) => {
  section.addEventListener("scroll", () => {
    const atBottom =
      section.scrollHeight - section.scrollTop === section.clientHeight;
    //   section.querySelector(".scroll-hint").style.display = atBottom
    //     ? "none"
    //     : "block";
  });
});

// File upload
document
  .getElementById("fileUploadForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const docName = document.getElementById("documentName").value;
    const fileInput = document.getElementById("fileInput");

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(file.name);

      await fileRef.put(file);
      const fileURL = await fileRef.getDownloadURL();

      firebase
        .firestore()
        .collection("files")
        .doc(docName)
        .set({
          file: fileURL,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  });

document.getElementById("fileInput").addEventListener("change", function (e) {
  const fileNameDisplay = document.getElementById("fileName");
  fileNameDisplay.textContent =
    e.target.files.length > 0 ? e.target.files[0].name : "No file chosen";
});

function toggleAccordion(headerEl) {
  const card = headerEl.parentElement;
  const isActive = card.classList.contains("active");

  // Collapse any open cards
  document.querySelectorAll(".accordion-card").forEach((el) => {
    el.classList.remove("active");
  });

  // Expand clicked card if not already active
  if (!isActive) {
    card.classList.add("active");
  }
}
