// Carregar informações dos repositórios do GitHub
async function fetchRepoInfo(repo) {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await response.json();
    return data;
}

document.addEventListener('DOMContentLoaded', async () => {
    const repos = document.querySelectorAll('.repository');
    for (const repoElement of repos) {
        const repo = repoElement.getAttribute('data-repo');
        const repoInfo = await fetchRepoInfo(repo);
        repoElement.querySelector('a').innerText = repoInfo.name;
        repoElement.insertAdjacentHTML('beforeend', `<p>${repoInfo.description}</p>`);
        repoElement.insertAdjacentHTML('beforeend', `<p>⭐ ${repoInfo.stargazers_count} | 🍴 ${repoInfo.forks_count}</p>`);
    }

    // Carousel functionality
    const carousel = document.querySelector('.carousel-inner');
    let offset = 0;
    setInterval(() => {
        offset = (offset + 100) % (carousel.children.length * 100);
        carousel.style.transform = `translateX(-${offset}%)`;
    }, 3000);

    // Dark/Light mode toggle
    const toggleButton = document.getElementById('toggle-button');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
});
