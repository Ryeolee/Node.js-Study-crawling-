const puppeteer = require('puppeteer');


const focus = async () => {
    try {

        const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1920,1080', '--disable-notifications'] });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1080
        });
        await page.goto('https://stackoverflow.com/users/login?ssrc=head&returnurl=https%3a%2f%2fstackoverflow.com%2f');
    
        await page.evaluate(() => {
            (() => {
              const box = document.createElement('div');
              box.classList.add('mouse-helper');
              const styleElement = document.createElement('style');
              styleElement.innerHTML = `
                .mouse-helper {
                  pointer-events: none;
                  position: absolute;
                  z-index: 100000;
                  top: 0;
                  left: 0;
                  width: 20px;
                  height: 20px;
                  background: rgba(0,0,0,.4);
                  border: 1px solid white;
                  border-radius: 10px;
                  margin-left: -10px;
                  margin-top: -10px;
                  transition: background .2s, border-radius .2s, border-color .2s;
                }
                .mouse-helper.button-1 {
                  transition: none;
                  background: rgba(0,0,0,0.9);
                }
                .mouse-helper.button-2 {
                  transition: none;
                  border-color: rgba(0,0,255,0.9);
                }
                .mouse-helper.button-3 {
                  transition: none;
                  border-radius: 4px;
                }
                .mouse-helper.button-4 {
                  transition: none;
                  border-color: rgba(255,0,0,0.9);
                }
                .mouse-helper.button-5 {
                  transition: none;
                  border-color: rgba(0,255,0,0.9);
                }
                `;
              document.head.appendChild(styleElement);
              document.body.appendChild(box);
              document.addEventListener('mousemove', event => {
                box.style.left = event.pageX + 'px';
                box.style.top = event.pageY + 'px';
                updateButtons(event.buttons);
              }, true);
              document.addEventListener('mousedown', event => {
                updateButtons(event.buttons);
                box.classList.add('button-' + event.which);
              }, true);
              document.addEventListener('mouseup', event => {
                updateButtons(event.buttons);
                box.classList.remove('button-' + event.which);
              }, true);
              function updateButtons(buttons) {
                for (let i = 0; i < 5; i++)
                  box.classList.toggle('button-' + i, !!(buttons & (1 << i)));
              }
            })();
          });
          await page.click('#email');                     // 클릭으로 포커스 설정
          await page.keyboard.down('ShiftLeft');          // 시프트 누르기
          await page.keyboard.press('KeyL');
          await page.waitForTimeout(500);
          await page.keyboard.press('KeyE');
          await page.waitForTimeout(500);
          await page.keyboard.press('KeyE');
          await page.waitForTimeout(500);
          await page.keyboard.press('KeyR');
          await page.waitForTimeout(500);
          await page.keyboard.press('KeyY');
          await page.waitForTimeout(500);
          await page.keyboard.press('KeyE');
          await page.waitForTimeout(500);
          await page.keyboard.up('ShiftLeft');            // 시프트 떼기



    } catch (e) {
        console.log(e);
    }

}

focus();