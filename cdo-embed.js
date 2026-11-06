/* UNIMAS Open Science Conference — CDO Embed Scripts */
(function() {
    window.uoscSwitchDay = function(day) {
        document.querySelectorAll('#uosc .uosc-agenda-tab').forEach(function(t, i) {
            t.classList.toggle('uosc-active', i === day - 1);
        });
        document.querySelectorAll('#uosc .uosc-agenda-day').forEach(function(d, i) {
            d.classList.toggle('uosc-active', i === day - 1);
        });
    };

    var revealObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) e.target.classList.add('uosc-visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('#uosc .uosc-reveal').forEach(function(el) {
        revealObs.observe(el);
    });

    var statObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (!e.isIntersecting) return;
            var el = e.target, target = parseInt(el.getAttribute('data-uosc-target'));
            var suffix = target >= 100 ? '+' : '';
            var cur = 0, step = Math.max(1, Math.floor(target / 60));
            var timer = setInterval(function() {
                cur += step;
                if (cur >= target) { cur = target; clearInterval(timer); }
                el.textContent = cur + suffix;
            }, 30);
            statObs.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('#uosc .uosc-stat-value[data-uosc-target]').forEach(function(el) {
        statObs.observe(el);
    });
})();
