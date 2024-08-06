//Echart Graph基本配置
export const options = {
  tooltip: {
    formatter: (param) => {
      if (param.dataType === 'edge') {
        return param.value
      } else {
        return param.value
      }
    }
    // position: (point)=>{
    // }
  },
  animationDurationUpdata: 0,
  series: [
    {
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 500,
        gravity: 0.01,
        edgeLength: [200, 220]
      },
      roam: true,
      draggable: true,
      symbol: 'circle',
      symbolSize: 80,
      label: {
        formatter: (param) => {
          return param.data.nameToShow
        },
        show: true,
        align: 'center',
        color: '#606266'
      },
      itemStyle: {
        color: '#eee',
        borderColor: '#ccc',
        borderWidth: 1,
        borderType: 'solid'
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 8],
      edgeLabel: {
        formatter: (param) => {
          return param.data.amount
        },
        show: true,
        color: '#606266',
        opacity: 1
      },
      lineStyle: {
        color: '#606266',
        width: 1
      },
      scaleLimit: {
        min: 0.5,
        max: 50
      },
      autoCurveness: true,
      data: [],
      links: []
    }
  ]
}
//布局类型
export enum LAYOUT_TYPE {
  LONGEST_UNFIXED = 'LongestUnFixed',
  SHORT_LONGEST_FIXED = 'ShortLongestFixed'
}
//重建节点和边数组
export const createNodeList = (nodeList, layoutMethod) => {
  return nodeList.map((item) => {
    let layoutSetting = {}
    switch (layoutMethod) {
      case LAYOUT_TYPE.LONGEST_UNFIXED:
        layoutSetting = item.index
          ? item.index === 1
            ? { x: 170 * item.index, y: 301 }
            : { x: 170 * item.index, y: 300 }
          : {}
        break
      case LAYOUT_TYPE.SHORT_LONGEST_FIXED:
        layoutSetting = item.index ? { x: 170 * item.index, y: 300, fixed: true } : {}
        break
    }
    return {
      ...item,
      ...layoutSetting
    }
  })
}
export const createEdgeList = (edgeList, foldDirection) => {
  const unFoledEdges = edgeList.filter((itemE) => {
    return (
      foldDirection.findIndex((itemF) => {
        return itemF.source === itemE.source && itemF.target === itemE.target
      }) === -1
    )
  })
  const foledD = foldDirection.map((item) => {
    return {
      ...item,
      amount: '已折叠',
      value: '点击展开'
    }
  })
  return unFoledEdges.concat(foledD)
}
//计算主链
export const findMainChain = (nodelist, edgeList, layoutMethod) => {
  if (nodelist === null || edgeList === null) {
    return []
  }
  //构建邻接表[{source:[target set]}]
  const adjacencyMap = {}
  edgeList.forEach((item) => {
    if (adjacencyMap[item.source]) {
      adjacencyMap[item.source].add(item.target)
    } else {
      adjacencyMap[item.source] = new Set([item.target])
    }
  })
  //dfs算法
  const memo = {}
  const stack = new Set()
  const circleNode = new Set()
  const dfsFindMainChain = (curNode) => {
    if (memo[curNode]) {
      //memo中有这个节点，说明已经求过它的最长链
      return memo[curNode]
    }
    if (stack.has(curNode)) {
      circleNode.add(curNode)
      return []
    }
    stack.add(curNode)
    let maxChain = []
    if (adjacencyMap[curNode]) {
      for (const neighborNode of adjacencyMap[curNode]) {
        const neighborChain = dfsFindMainChain(neighborNode)
        if (neighborChain.length > maxChain.length) {
          maxChain = neighborChain
        }
      }
    }
    memo[curNode] = [curNode, ...maxChain]
    stack.delete(curNode)
    return memo[curNode]
  }
  //找最长链
  let longestChainNames = []
  for (const node of nodelist) {
    const chain = dfsFindMainChain(node.name)
    if (chain.length > longestChainNames.length) {
      longestChainNames = chain
    }
  }
  const getShortInLongestChain = () => {
    //console.log('longestChain', circleNode, longestChainNames)
    //找主链中的最短通路，贪心算法正向反向各来一遍
    const shortInLongChainLeft = [longestChainNames[0]]
    for (let i = 0; i < longestChainNames.length; i++) {
      for (let j = longestChainNames.length - 1; j > i; j--) {
        const index = Array.from(adjacencyMap[longestChainNames[i]]).indexOf(longestChainNames[j])
        if (index !== -1) {
          shortInLongChainLeft.push(longestChainNames[j])
          i = j - 1 //因为一次循环结束要++
          break
        }
      }
    }
    //console.log('shortleft', shortInLongChainLeft)
    const shortInLongChain = [shortInLongChainLeft[shortInLongChainLeft.length - 1]]
    for (let i = shortInLongChainLeft.length - 1; i > 0; i--) {
      if (adjacencyMap[shortInLongChainLeft[i]] === undefined) {
        //最后一个节点入度为0
        shortInLongChain.unshift(shortInLongChainLeft[i - 1])
        continue
      }
      let flag = false
      for (let j = 0; j < i; j++) {
        const index = Array.from(adjacencyMap[shortInLongChainLeft[i]]).indexOf(
          shortInLongChainLeft[j]
        )
        if (index !== -1) {
          shortInLongChain.unshift(shortInLongChainLeft[j])
          i = j + 1 //因为一次循环结束要--
          flag = true
          break
        }
      }
      if (flag === false) {
        //没找到要把前一个默认加进来
        shortInLongChain.unshift(shortInLongChainLeft[i - 1])
      }
    }
    //console.log('short', shortInLongChain)
    return shortInLongChain
  }
  let longestChain = []
  switch (layoutMethod) {
    case LAYOUT_TYPE.LONGEST_UNFIXED:
      longestChain = longestChainNames
      break
    case LAYOUT_TYPE.SHORT_LONGEST_FIXED:
      longestChain = getShortInLongestChain()
      break
  }
  nodelist.forEach((item) => {
    item.index = longestChain.indexOf(item.name) + 1
  })
}
//默认折叠边
export const defaultFoldDirection = (edgeList, foldDirection) => {
  const directionCount = []
  edgeList.forEach((item) => {
    const index = directionCount.findIndex((exist) => {
      return exist.source === item.source && exist.target === item.target
    })
    if (index === -1) {
      directionCount.push({ source: item.source, target: item.target, count: 1 })
    } else {
      directionCount[index].count++
      if (directionCount[index].count === 4) {
        foldDirection.push({ source: item.source, target: item.target })
      }
    }
  })
}
