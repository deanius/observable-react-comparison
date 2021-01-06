export const observable = (defaultValue) => {
  let value = defaultValue;

  let subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach((subscriber) => {
      subscriber();
    });
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      subscribers = subscribers.filter((fn) => fn !== subscriber);
    };
  };

  const get = () => {
    return value;
  };

  const set = (nextValue) => {
    if (typeof nextValue === "function") {
      value = nextValue(value);
    } else {
      value = nextValue;
    }
    notifySubscribers();
  };

  return {
    get,
    set,
    subscribe
  };
};

export const derived = (dependencies, deriver) => {
  let deps = dependencies;
  if (!Array.isArray(deps)) {
    deps = [deps];
  }

  const getDepValues = () => {
    return deps.map((dep) => dep.get());
  };

  deps.forEach((dep) => {
    dep.subscribe(() => {
      notifySubscribers();
    });
  });

  let subscribers = [];

  const notifySubscribers = () => {
    subscribers.forEach((subscriber) => {
      subscriber();
    });
  };

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);
    return () => {
      subscribers = subscribers.filter((fn) => fn !== subscriber);
    };
  };

  const get = () => {
    return deriver(...getDepValues());
  };

  return {
    get,
    subscribe
  };
};

export const observe = (dependencies, effect) => {
  let deps = dependencies;
  if (!Array.isArray(deps)) {
    deps = [deps];
  }

  const getDepValues = () => {
    return deps.map((dep) => dep.get());
  };

  deps.forEach((dep) => {
    dep.subscribe(() => {
      effect(...getDepValues());
    });
  });

  effect(...getDepValues());
};
