# 各位觀眾 - 5 張 A

### Trigger
`$('#fiveAce').fiveAce();`

### Options
`$('#fiveAce').fiveAce({
	'gap' : 30, // gap distance without 'px'
	'item' : '.item' // item class selector
});`

### Structure
```html
<div id="fiveAce">
  <div class="currentWrapper">
    <div class="item">
      <div class="thumb">
        <div class="thumb-inner"><img src="http://unsplash.it/100/100"/></div>
      </div>
      <div class="content">
        <div class="content-inner">
          <h4><a href="javascript:;">title</a></h4>
          <p>blablabla</p>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="thumb">
        <div class="thumb-inner"><img src="http://unsplash.it/100/100"/></div>
      </div>
      <div class="content">
        <div class="content-inner">
          <h4><a href="javascript:;">title</a></h4>
          <p>blablabla</p>
        </div>
      </div>
    </div>
    .
    .
    .
    .
    .
  </div>
</div>
```