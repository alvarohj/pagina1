const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCEqOA9C5bhpEDKGKIcBAZCQ&part=snippet%2Cid&order=date&maxResults=3';
const content = document.getElementById('content');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '86a4e32fffmshac4ac2322891977p1f7fbbjsn2a504c5e8240',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlApi) {
    try {
        const response = await fetch(urlApi, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
        content.innerHTML = `<p class="text-red-500">There was an error loading the videos. Please try again later.</p>`;
    }
}

(async () => {
    const videos = await fetchData(API);
    if (videos && videos.items) {
        let view = `
            ${videos.items.map(video => `
                <div class="group relative">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description || video.snippet.title}" class="w-full" loading="lazy">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                        <p class="text-sm text-gray-500">Published on: ${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            `).join('')}
        `;
        content.innerHTML = view;
    }
})();
