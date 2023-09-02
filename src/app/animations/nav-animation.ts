import { Animation, AnimationController } from "@ionic/angular"

export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const DURATION = 100
    const animationCtrl = new AnimationController()

    if (opts.declarations === 'forward') {
        return animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(DURATION)
        .easing('ease-in')
        .fromTo('opacity', 1, 1)

    } else {
        const rootAnimation = animationCtrl.create()
        .addElement(opts.enteringEl)
        .duration(DURATION)
        .easing('ease-in')
        .fromTo('opacity', 1, 1)

        const leavingAnimation = animationCtrl.create()
        .addElement(opts.leavingEl)
        .duration(DURATION)
        .easing('ease-in')
        .fromTo('opacity', 1, 1)

        return animationCtrl.create().addAnimation([
            rootAnimation, leavingAnimation
        ])
    }
    
}