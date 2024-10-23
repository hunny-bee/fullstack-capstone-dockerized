import { Actor } from 'apify';
import { PuppeteerCrawler, Dataset } from 'crawlee';

await Actor.init();

const startUrl = 'https://www.airbnb.co.za/s/Cape-Town--Western-Cape--South-Africa/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-11-01&monthly_length=3&monthly_end_date=2025-02-01&price_filter_input_type=0&channel=EXPLORE&query=Cape%20Town%2C%20Western%20Cape&place_id=ChIJ1-4miA9QzB0Rh6ooKPzhf2g&location_bb=wgXilUGYCZDCCXBxQZJ1qA%3D%3D&date_picker_type=calendar&source=structured_search_input_header&search_type=autocomplete_click';

const crawler = new PuppeteerCrawler({
    async requestHandler({ request, page, log, enqueueLinks }) {
        if (request.url.includes('/rooms/')) {
            console.log('Scraping property page', { url: request.url });
            const property = await page.evaluate(() => {
                return {
                    title: document.querySelector('h1')?.innerText,
                    description: document.querySelector('[data-section-id="DESCRIPTION_DEFAULT"] div')?.innerText,
                    address: document.querySelector('[data-section-id="LOCATION_DEFAULT"] div')?.innerText,
                    city: 'Cape Town',
                    country: 'South Africa',
                    images: Array.from(document.querySelectorAll('[data-testid="photo-viewer"] img')).map(img => img.src),
                    amenities: Array.from(document.querySelectorAll('[data-section-id="AMENITIES_DEFAULT"] div[role="listitem"]')).map(item => item.innerText),
                    price: document.querySelector('._tyxjp1')?.innerText,
                    host: document.querySelector('._f47qa6')?.innerText,
                    rating: document.querySelector('._17p6nbba')?.innerText,
                    reviewsCount: document.querySelector('._s65ijh7')?.innerText,
                };
            });

            await Dataset.pushData(property);
            console.log('Scraped property data', { property });
        } else {
            console.log('Scraping search results page', { url: request.url });
            await page.waitForSelector('div[itemprop="itemListElement"]', { timeout: 60000 });
            
            const searchResults = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('div[itemprop="itemListElement"]')).map(item => ({
                    title: item.querySelector('div[data-testid="listing-card-title"]')?.innerText,
                    price: item.querySelector('span[data-testid="price-and-discounted-price"]')?.innerText,
                    rating: item.querySelector('span[aria-label*="rating"]')?.getAttribute('aria-label'),
                    link: item.querySelector('a[data-testid="card-link"]')?.href,
                }));
            });

            await Dataset.pushData(searchResults);
            console.log(`Scraped ${searchResults.length} search results`);

            await page.waitForSelector('a[href^="/rooms/"]', { timeout: 60000 });
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            
            // Use a promise to wait instead of page.waitForTimeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            await enqueueLinks({
                selector: 'a[href^="/rooms/"]',
                baseUrl: new URL(request.url).origin,
            });
        }
    },
    maxRequestsPerCrawl: 100,
    maxConcurrency: 2,
});

console.log('Starting the crawl');
await crawler.run([startUrl]);

console.log('Crawl finished');
await Actor.exit();