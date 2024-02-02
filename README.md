# slick-integration
This is a very basic implementation of the Slick Slider within Adobe Experience manager. None of Slick's options are exposed as authorable and are hardcoded to match the requirements of a single desired outcome.

The implementation includes extra JavaScript that resizes parts of each slide so that all slides have the same height. In the case of images, larger images are scaled down to match the smallest image vertically. In the case of text, divs containing less text are made taller to match those containing more text.

Due to the order in which code is executed, this resizing occurs after a short delay each time the browser is resized in order to give Slick's own sizing logic time to execute first. I'd really like to come up with a less sloppy way to do this, but it works pretty well as is.

NOTE: This section only actually "slides" on screens smaller than 768px wide - this is the desired behavior, not my choice.

OTHER NOTE: I didn't create the authoring dialog for this.
