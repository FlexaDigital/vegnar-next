#!/bin/bash

# Quick SEO Health Check for Vegnar.com
echo "🚀 Vegnar.com SEO Health Check"
echo "=============================="

# Check if site is accessible
echo "🌐 Site Accessibility:"
if curl -s --head https://www.vegnar.com/ | head -n 1 | grep -q "200 OK"; then
    echo "✅ Main site: Online"
else
    echo "❌ Main site: Issue detected"
fi

# Check robots.txt
echo ""
echo "🤖 Robots.txt Status:"
if curl -s https://www.vegnar.com/robots.txt | grep -q "Sitemap:"; then
    echo "✅ Main robots.txt: Configured"
else
    echo "❌ Main robots.txt: Issue detected"
fi

# Check if CMS is blocked
echo ""
echo "🔒 CMS Protection:"
cms_status=$(curl -s -o /dev/null -w "%{http_code}" https://cms.vegnar.com/robots.txt)
if [[ $cms_status == "200" ]]; then
    if curl -s https://cms.vegnar.com/robots.txt | grep -q "Disallow: /"; then
        echo "✅ CMS robots.txt: Properly blocked"
    else
        echo "⚠️  CMS robots.txt: Needs blocking rules"
    fi
else
    echo "⚠️  CMS robots.txt: Not accessible (Status: $cms_status)"
fi

# Check canonical URL
echo ""
echo "🔗 Canonical URLs:"
if curl -s https://www.vegnar.com/ | grep -q 'rel="canonical"'; then
    echo "✅ Canonical tags: Present"
else
    echo "⚠️  Canonical tags: Missing"
fi

# Check sitemap
echo ""
echo "🗺️  Sitemap:"
if curl -s https://www.vegnar.com/sitemap.xml | grep -q "<urlset"; then
    echo "✅ Sitemap: Accessible"
else
    echo "❌ Sitemap: Issue detected"
fi

echo ""
echo "📊 SEO Health Summary:"
echo "======================"
echo "✅ = Good to go"
echo "⚠️  = Needs attention" 
echo "❌ = Critical issue"
echo ""
echo "Next: Focus on content creation for target keywords!"