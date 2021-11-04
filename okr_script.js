const okr_block_template = '' +
  '        <div class="objective">\n' +
  '          <div class="expand_toggle_wrapper">\n' +
  '            <div class="expand_toggle">\n' +
  '              <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  '                <path d="M1 1L5 5L1 9" stroke="#172B4D" stroke-width="1.5" stroke-linecap="round"/>\n' +
  '              </svg>\n' +
  '            </div>\n' +
  '          </div>\n' +
  '          <div class="objective_text">\n' +
  '            Все должны знать 🚀 \n' +
  '          </div>\n' +
  '        </div>\n' +
  '\n' +
  '        <div class="progressbar_section">\n' +
  '          <div class="dummy_block"></div>\n' +
  '          <div class="progressbar_wrapper">\n' +
  '            <div class="progressbar"></div>\n' +
  '            <div class="progress_percent">100%</div>\n' +
  '          </div>\n' +
  '        </div>\n';

const key_result_template = '' +
  '      <div class="key_result">\n' +
  '        <div class="key_result_text">\n' +
  '          <div class="icon">\n' +
  '            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  '              <circle cx="2" cy="2" r="2" fill="#42526E"/>\n' +
  '            </svg>\n' +
  '          </div>\n' +
  '          <div class="text">Внедрить OKR - у каждого отдела есть цели и ключевые результаты на квартал, раз в неделю\n' +
  '            обсуждаем прогресс\n' +
  '          </div>\n' +
  '        </div>\n' +
  '        <div class="key_result_progressbar_section">\n' +
  '          <div class="dummy_block"></div>\n' +
  '          <div class="key_result_progressbar">\n' +
  '            <div class="progressbar"></div>\n' +
  '            <div class="progress_percent">100%</div>\n' +
  '          </div>\n' +
  '        </div>\n' +
  '      </div>';

const done_key_result_icon = '' +
  '<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
  ' <path d="M1 3.18182L4.11111 7L9 1" stroke="#136AFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
  '</svg>';


function generate_key_results_block(key_results, position_number) {

  let key_results_block = document.createElement('div');
  key_results_block.classList.add('key_result_block');
  key_results_block.classList.add('active');

  for (let key_result of key_results) {
    console.log(key_result);
    let temp_node = document.createElement('div');
    temp_node.innerHTML = key_result_template;
    let key_result_element = temp_node.firstElementChild;

    key_result_element.querySelector('.key_result_text > .text').innerText = key_result.text;
    let progress = Math.round(key_result.progress * 100) + '%';
    key_result_element.querySelector('.progressbar').style.setProperty('--progress_variable', progress);
    key_result_element.querySelector('.progress_percent').innerText = progress;

    if (progress == '100%') {
      key_result_element.classList.add('done');
      key_result_element.querySelector('.icon').innerHTML = done_key_result_icon;
    }
    key_results_block.appendChild(key_result_element);
  }

  key_results_block.style.setProperty('grid-column-start', position_number);
  key_results_block.style.setProperty('grid-row-start', 2);

  return key_results_block;
}

function render_okr(wrapper_element, okr, position_number) {
  let okr_block = document.createElement('div');
  okr_block.classList.add('okr_block');
  okr_block.innerHTML = okr_block_template;

  okr_block.querySelector('.objective_text').innerText = okr.text;
  let progress = Math.round(okr.progress * 100) + '%';
  okr_block.querySelector('.progress_percent').innerText = progress;
  okr_block.querySelector('.progressbar').style.setProperty('--progress_variable', progress);
  okr_block.style.setProperty('grid-column-start', position_number);
  okr_block.style.setProperty('grid-row-start', 1);

  wrapper_element.appendChild(okr_block);

  wrapper_element.appendChild(generate_key_results_block(okr.key_results, position_number));

}

function renderData(data) {
  let wrappers = document.getElementsByClassName('okrs_wrapper');

  for (let wrapper of wrappers) {
      let department = wrapper.dataset.department;

      let position_number = 0;
      for (let okr of data[department]['objectives']) {
        position_number++;

        render_okr(wrapper, okr, position_number)
      }
  }

}
