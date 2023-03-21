const tbody = document.querySelector("tbody");
const video = JSON.parse(localStorage.BDRVideo);

function createElementTable (video) {
  return video.map((el, i) => {
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${el.videoName}</td>
        <td title="При настиску сортувати.">${el.data}</td>
        <td title="При настиску сортувати.">${el.videoLink}</td>
        <td>&#128397;</td>
        <td>&#128465;</td>
      </tr>
    `
  }).join("");
};

tbody.insertAdjacentHTML("beforeend", createElementTable(video));
