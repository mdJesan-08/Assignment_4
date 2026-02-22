const jobs = [
  {
    id: 1,
    company: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build cross-platform mobile applications used by millions worldwide.",
    status: "all"
  },
  {
    id: 2,
    company: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Create modern web experiences for premium clients.",
    status: "all"
  },
  {
    id: 3,
    company: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description: "Transform complex datasets into interactive dashboards.",
    status: "all"
  },
  {
    id: 4,
    company: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description: "Develop scalable backend systems using AWS and Python.",
    status: "all"
  },
  {
    id: 5,
    company: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description: "Design intuitive user interfaces for SaaS products.",
    status: "all"
  },
  {
    id: 6,
    company: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description: "Develop enterprise-level web applications.",
    status: "all"
  },
  {
    id: 7,
    company: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description: "Work on core startup platform architecture.",
    status: "all"
  },
  {
    id: 8,
    company: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description: "Build scalable React and TypeScript applications.",
    status: "all"
  }
];

let currentTab = "all";

const jobContainer = document.getElementById("jobContainer");
const emptyState = document.getElementById("emptyState");

function renderJobs() {

  jobContainer.innerHTML = "";

  const filtered = jobs.filter(job => {
    if(currentTab === "all") return true;
    return job.status === currentTab;
  });

  document.getElementById("tabCount").innerText =
    filtered.length + " jobs";

  if(filtered.length === 0){
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  filtered.forEach(job => {

    const card = document.createElement("div");
    card.className =
      "card bg-base-100 shadow p-6 hover:shadow-lg transition";

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-bold text-lg">${job.company}</h3>
          <p class="text-sm text-gray-500">${job.position}</p>
        </div>
        <button class="deleteBtn text-red-500"
          data-id="${job.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>

      <p class="text-sm mt-3">
        ${job.location} • ${job.type} • ${job.salary}
      </p>

      ${job.status !== "all"
        ? `<span class="badge mt-3 ${
            job.status === "interview"
              ? "badge-success"
              : "badge-error"
          }">${job.status}</span>`
        : ""
      }

      <p class="mt-4 text-sm">${job.description}</p>

      <div class="mt-5 flex gap-3">
        <button class="btn btn-outline btn-success actionBtn"
          data-id="${job.id}" data-action="interview">
          Interview
        </button>

        <button class="btn btn-outline btn-error actionBtn"
          data-id="${job.id}" data-action="rejected">
          Rejected
        </button>
      </div>
    `;

    jobContainer.appendChild(card);
  });

  updateDashboard();
}

function updateDashboard(){
  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText =
    jobs.filter(j => j.status === "interview").length;
  document.getElementById("rejectedCount").innerText =
    jobs.filter(j => j.status === "rejected").length;
}

document.addEventListener("click", function(e){

  if(e.target.closest(".actionBtn")){
    const id =
      Number(e.target.closest(".actionBtn").dataset.id);
    const action =
      e.target.closest(".actionBtn").dataset.action;

    const job = jobs.find(j => j.id === id);

    job.status =
      job.status === action ? "all" : action;

    renderJobs();
  }

  if(e.target.closest(".deleteBtn")){
    const id =
      Number(e.target.closest(".deleteBtn").dataset.id);
    const index =
      jobs.findIndex(j => j.id === id);
    jobs.splice(index, 1);
    renderJobs();
  }

  if(e.target.classList.contains("tabBtn")){
    document.querySelectorAll(".tabBtn")
      .forEach(btn =>
        btn.classList.remove("btn-primary")
      );

    e.target.classList.add("btn-primary");
    currentTab = e.target.dataset.tab;
    renderJobs();
  }

});

renderJobs();