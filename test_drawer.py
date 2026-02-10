import os
import asyncio
from playwright.async_api import async_playwright

# Manually set HOME to avoid the "missing HOME" error
os.environ["HOME"] = os.path.expanduser("~")

async def run():
    async with async_playwright() as p:
        print("Launching browser...")
        browser = await p.chromium.launch(headless=True)
        
        # Create a mobile context
        context = await browser.new_context(
            viewport={"width": 375, "height": 812},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
        )
        
        page = await context.new_page()
        
        print("Navigating to local server...")
        await page.goto("http://localhost:8000/index.html")
        
        # Wait for potential animations
        await page.wait_for_timeout(1000)
        
        print("Taking initial screenshot...")
        await page.screenshot(path="mobile_initial_v2.png")
        
        print("Clicking hamburger menu...")
        await page.click(".navbar-toggle")
        
        # Wait for animation
        await page.wait_for_timeout(1000)
        
        print("Taking drawer screenshot...")
        await page.screenshot(path="mobile_drawer_v2.png")
        
        await browser.close()
        print("Done! Screenshots saved to mobile_initial_v2.png and mobile_drawer_v2.png")

if __name__ == "__main__":
    asyncio.run(run())
