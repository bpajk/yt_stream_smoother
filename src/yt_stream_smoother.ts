/**
 * Skips video ads
 * @returns void
 */
function skipAdsInVideo(): void {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector("#movie_player");

  if (!targetNode) {
    return;
  }

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: false, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = (
    mutationList: MutationRecord[],
    _observer: MutationObserver
  ) => {
    const add_in_progress = mutationList.some(
      (mutation) =>
        mutation.type === "attributes" &&
        mutation.attributeName === "class" &&
        (mutation.target as HTMLElement).classList.contains("ad-interrupting")
    );

    if (!add_in_progress) {
      return;
    }

    const video = document.querySelector("video");

    if (!video) {
      return;
    }

    console.log("skipAdsInVideo");

    // skip ad - set the ad video current time to its end
    video.currentTime = video.duration;
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}

/**
 * Hides popups
 * @param targetNodeName string
 * @param popupTagName string
 * @returns void
 */
function hidePopup(targetNodeName: string, popupTagName: string): void {
  // Select the node that will be observed for mutations
  const targetNode = document.querySelector(targetNodeName);

  if (!targetNode) {
    return;
  }

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: false };

  const popupTagNameUpperCase = popupTagName.toUpperCase();

  // Callback function to execute when mutations are observed
  const callback = (
    mutationList: MutationRecord[],
    _observer: MutationObserver
  ) => {
    const popup_visible = mutationList.some((mutation) =>
      Array.from(mutation.addedNodes).some(
        (node) => (node as HTMLElement).tagName === popupTagNameUpperCase
      )
    );

    if (!popup_visible) {
      return;
    }

    const popup = document.querySelector(popupTagName);

    if (!popup) {
      return;
    }

    console.log("hidePopup");

    // hide the popup
    (popup as HTMLElement).style.display = "none";
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}

skipAdsInVideo();
hidePopup("body", "tp-yt-paper-dialog");
hidePopup("body", "tp-yt-iron-overlay-backdrop");
