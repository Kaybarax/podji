module.exports = {
  id: 'mobile-ui-visual-regression',
  viewports: [
    {
      label: 'phone',
      width: 375,
      height: 667,
    },
    {
      label: 'tablet',
      width: 768,
      height: 1024,
    },
  ],
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios: [
    {
      label: 'Toggle - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - On',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--on&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - Off',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--off&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - WithLabelOnRight',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--withlabelonright&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - WithLabelOnLeft',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--withlabelonleft&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - DisabledOn',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--disabledon&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - WithCustomStyles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--withcustomstyles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toggle - MultipleToggles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toggle--multipletoggles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - Success',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--success&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - Error',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--error&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - Warning',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--warning&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - Info',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--info&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - TopPosition',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--topposition&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - BottomPosition',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--bottomposition&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - LongDuration',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--longduration&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - NonDismissible',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--nondismissible&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Toast - ToastProviderDemo',
      url: 'http://localhost:6007/iframe.html?args=&id=components-toast--toastproviderdemo&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - WithLabel',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--withlabel&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - Required',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--required&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - WithHelperText',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--withhelpertext&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - WithError',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--witherror&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - OutlinedVariant',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--outlinedvariant&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - FilledVariant',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--filledvariant&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - UnderlinedVariant',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--underlinedvariant&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - Multiline',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--multiline&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'TextInput - WithCustomStyles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-textinput--withcustomstyles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - WithLabels',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--withlabels&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - WithCustomLabels',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--withcustomlabels&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - WithValue',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--withvalue&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - WithValueFormatter',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--withvalueformatter&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - WithStep',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--withstep&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - CustomColors',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--customcolors&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - CustomStyles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--customstyles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - VolumeSlider',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--volumeslider&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - TempoSlider',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--temposlider&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Slider - CrossfadeSlider',
      url: 'http://localhost:6007/iframe.html?args=&id=components-slider--crossfadeslider&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - Selected',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--selected&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - Unselected',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--unselected&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - WithLabelOnRight',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--withlabelonright&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - WithLabelOnLeft',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--withlabelonleft&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - DisabledSelected',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--disabledselected&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - WithCustomStyles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--withcustomstyles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - SimpleRadioGroup',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--simpleradiogroup&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - GenderSelection',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--genderselection&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'RadioButton - PaymentMethods',
      url: 'http://localhost:6007/iframe.html?args=&id=components-radiobutton--paymentmethods&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - CurrentPageInMiddle',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--currentpageinmiddle&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - LastPage',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--lastpage&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - WithFirstLastButtons',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--withfirstlastbuttons&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - WithoutPrevNextButtons',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--withoutprevnextbuttons&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - FewPages',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--fewpages&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - ManyVisiblePages',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--manyvisiblepages&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Pagination - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-pagination--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Page - LoggedIn',
      url: 'http://localhost:6007/iframe.html?args=&id=components-page--loggedin&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Page - LoggedOut',
      url: 'http://localhost:6007/iframe.html?args=&id=components-page--loggedout&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'NavigationBar - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-navigationbar--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'NavigationBar - WithNotification',
      url: 'http://localhost:6007/iframe.html?args=&id=components-navigationbar--withnotification&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'NavigationBar - WithSearch',
      url: 'http://localhost:6007/iframe.html?args=&id=components-navigationbar--withsearch&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'NavigationBar - WithBoth',
      url: 'http://localhost:6007/iframe.html?args=&id=components-navigationbar--withboth&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'NavigationBar - WithLogo',
      url: 'http://localhost:6007/iframe.html?args=&id=components-navigationbar--withlogo&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'NavigationBar - WithLogoAndIcons',
      url: 'http://localhost:6007/iframe.html?args=&id=components-navigationbar--withlogoandicons&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - CenterPosition',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--centerposition&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - BottomPosition',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--bottomposition&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - WithoutBackdrop',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--withoutbackdrop&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - NonDismissible',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--nondismissible&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - ScrollableContent',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--scrollablecontent&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - WithForm',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--withform&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - CustomStyles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--customstyles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - ConfirmationDialog',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--confirmationdialog&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Modal - SuccessMessage',
      url: 'http://localhost:6007/iframe.html?args=&id=components-modal--successmessage&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Link - Primary',
      url: 'http://localhost:6007/iframe.html?args=&id=components-link--primary&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Link - Secondary',
      url: 'http://localhost:6007/iframe.html?args=&id=components-link--secondary&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Link - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-link--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Link - WithCustomStyle',
      url: 'http://localhost:6007/iframe.html?args=&id=components-link--withcustomstyle&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Link - LongText',
      url: 'http://localhost:6007/iframe.html?args=&id=components-link--longtext&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Link - WithExternalURL',
      url: 'http://localhost:6007/iframe.html?args=&id=components-link--withexternalurl&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Header - LoggedIn',
      url: 'http://localhost:6007/iframe.html?args=&id=components-header--loggedin&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Header - LoggedOut',
      url: 'http://localhost:6007/iframe.html?args=&id=components-header--loggedout&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - Small',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--small&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - Medium',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--medium&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - Large',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--large&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - BottomRight',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--bottomright&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - BottomLeft',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--bottomleft&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - TopRight',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--topright&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - TopLeft',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--topleft&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - WithEmojiIcon',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--withemojiicon&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FloatingActionButton - WithComponentIcon',
      url: 'http://localhost:6007/iframe.html?args=&id=components-floatingactionbutton--withcomponenticon&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FeedCard - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-feedcard--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FeedCard - Liked',
      url: 'http://localhost:6007/iframe.html?args=&id=components-feedcard--liked&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FeedCard - LongTitle',
      url: 'http://localhost:6007/iframe.html?args=&id=components-feedcard--longtitle&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FeedCard - HighEngagement',
      url: 'http://localhost:6007/iframe.html?args=&id=components-feedcard--highengagement&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'FeedCard - NoEngagement',
      url: 'http://localhost:6007/iframe.html?args=&id=components-feedcard--noengagement&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - WithLabel',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--withlabel&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - WithSelectedValue',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--withselectedvalue&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - WithHelperText',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--withhelpertext&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - WithError',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--witherror&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - WithDisabledItems',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--withdisableditems&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - WithCustomStyles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--withcustomstyles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - CountrySelector',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--countryselector&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - LanguageSelector',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--languageselector&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - AudioQualitySelector',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--audioqualityselector&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Dropdown - GenreSelector',
      url: 'http://localhost:6007/iframe.html?args=&id=components-dropdown--genreselector&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'DatePicker - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-datepicker--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'DatePicker - WithSelectedDate',
      url: 'http://localhost:6007/iframe.html?args=&id=components-datepicker--withselecteddate&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'DatePicker - CustomFormat',
      url: 'http://localhost:6007/iframe.html?args=&id=components-datepicker--customformat&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'DatePicker - WithMinMaxDates',
      url: 'http://localhost:6007/iframe.html?args=&id=components-datepicker--withminmaxdates&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'DatePicker - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-datepicker--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'DatePicker - CustomPlaceholder',
      url: 'http://localhost:6007/iframe.html?args=&id=components-datepicker--customplaceholder&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'DatePicker - WithCustomStyle',
      url: 'http://localhost:6007/iframe.html?args=&id=components-datepicker--withcustomstyle&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - Checked',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--checked&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - Unchecked',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--unchecked&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - WithLabelOnRight',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--withlabelonright&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - WithLabelOnLeft',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--withlabelonleft&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - Disabled',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--disabled&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - DisabledChecked',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--disabledchecked&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - WithCustomStyles',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--withcustomstyles&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - CheckboxGroup',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--checkboxgroup&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Checkbox - TermsAndConditions',
      url: 'http://localhost:6007/iframe.html?args=&id=components-checkbox--termsandconditions&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Button - Primary',
      url: 'http://localhost:6007/iframe.html?args=&id=components-button--primary&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Button - Secondary',
      url: 'http://localhost:6007/iframe.html?args=&id=components-button--secondary&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Button - Large',
      url: 'http://localhost:6007/iframe.html?args=&id=components-button--large&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Button - Small',
      url: 'http://localhost:6007/iframe.html?args=&id=components-button--small&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'BottomTabNavigator - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-bottomtabnavigator--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'BottomTabNavigator - LibraryActive',
      url: 'http://localhost:6007/iframe.html?args=&id=components-bottomtabnavigator--libraryactive&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'BottomTabNavigator - MixActive',
      url: 'http://localhost:6007/iframe.html?args=&id=components-bottomtabnavigator--mixactive&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'BottomTabNavigator - ProfileActive',
      url: 'http://localhost:6007/iframe.html?args=&id=components-bottomtabnavigator--profileactive&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'BottomTabNavigator - ChatActive',
      url: 'http://localhost:6007/iframe.html?args=&id=components-bottomtabnavigator--chatactive&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'BottomTabNavigator - CustomTabs',
      url: 'http://localhost:6007/iframe.html?args=&id=components-bottomtabnavigator--customtabs&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - Default',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--default&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - WithDot',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--withdot&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - Success',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--success&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - Error',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--error&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - Warning',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--warning&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - Info',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--info&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - MaxValue',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--maxvalue&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - Small',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--small&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
    {
      label: 'Badge - Large',
      url: 'http://localhost:6007/iframe.html?args=&id=components-badge--large&viewMode=story',
      selectors: ['body'],
      delay: 3000,
      misMatchThreshold: 0.1,
    },
  ],
  paths: {
    bitmaps_reference: 'development/mobile-ui-dev/backstop_data/bitmaps_reference',
    bitmaps_test: 'development/mobile-ui-dev/backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'development/mobile-ui-dev/backstop_data/html_report',
    ci_report: 'development/mobile-ui-dev/backstop_data/ci_report',
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
